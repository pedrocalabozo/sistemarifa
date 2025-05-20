
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import type { User as NextAuthUser } from 'next-auth';

export interface UserProfile extends NextAuthUser {
  id: string; // Provisto por NextAuth o generado/obtenido de tu DB
  name: string; // Nombre completo o primer nombre de Google
  lastName: string;
  phone: string;
  idNumber: string; // Cedula
  email: string; // email de Google
  image?: string | null; // imagen de Google
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  login: () => void; // Simplificado, usará signIn('google')
  logout: () => void;
  updateProfile: (profileData: Pick<UserProfile, 'name' | 'lastName' | 'phone' | 'idNumber'>) => void;
  isProfileComplete: (userToCheck?: UserProfile | null) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [internalUser, setInternalUser] = useState<UserProfile | null>(null);

  const isLoadingAuth = status === 'loading';

  // Función para verificar si el perfil está completo
  const checkProfileComplete = (currentUser: UserProfile | null | undefined): boolean => {
    if (!currentUser) return false;
    return !!(currentUser.name && currentUser.lastName && currentUser.phone && currentUser.idNumber);
  };

  useEffect(() => {
    if (session?.user) {
      const storedProfileData = localStorage.getItem(`rifaUser_${session.user.email}`);
      let profileData: Partial<UserProfile> = {};
      if (storedProfileData) {
        profileData = JSON.parse(storedProfileData);
      }

      const combinedUser: UserProfile = {
        id: session.user.id || session.user.email!, // Usar id de session si existe, sino email como fallback
        email: session.user.email!,
        name: profileData.name || session.user.name || '',
        lastName: profileData.lastName || '',
        phone: profileData.phone || '',
        idNumber: profileData.idNumber || '',
        image: session.user.image,
      };
      setInternalUser(combinedUser);

      if (!isLoadingAuth && session?.user && !checkProfileComplete(combinedUser) && pathname !== '/register' && pathname !== '/login') {
        const redirect = searchParams.get('redirect');
        const redirectTo = redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register';
        router.push(redirectTo);
      }
    } else if (!isLoadingAuth && !session?.user) {
      setInternalUser(null); // Limpiar usuario si no hay sesión
    }
  }, [session, isLoadingAuth, router, pathname, searchParams]);

  const login = async () => {
    const redirectPath = searchParams.get('redirect') || '/raffles';
    // El callbackUrl se maneja por NextAuth para redirigir después del login.
    // Si el perfil no está completo, el useEffect anterior se encargará de redirigir a /register.
    await signIn('google', { callbackUrl: redirectPath });
  };

  const logout = async () => {
    if (internalUser?.email) {
      // Opcional: podrías querer limpiar localStorage aquí o dejarlo para la próxima vez que inicie sesión.
      // localStorage.removeItem(`rifaUser_${internalUser.email}`);
    }
    await signOut({ callbackUrl: '/login' });
    setInternalUser(null);
  };

  const updateProfile = (profileData: Pick<UserProfile, 'name' | 'lastName' | 'phone' | 'idNumber'>) => {
    if (internalUser && internalUser.email) {
      const updatedUser: UserProfile = {
        ...internalUser,
        ...profileData,
      };
      setInternalUser(updatedUser);
      localStorage.setItem(`rifaUser_${internalUser.email}`, JSON.stringify({
        name: updatedUser.name,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        idNumber: updatedUser.idNumber,
      }));
      
      if (checkProfileComplete(updatedUser)) {
        const redirect = searchParams.get('redirect');
        router.push(redirect || '/profile');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!session?.user, 
      user: internalUser, 
      login, 
      logout, 
      updateProfile, 
      isLoading: isLoadingAuth, 
      isProfileComplete: () => checkProfileComplete(internalUser) 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
