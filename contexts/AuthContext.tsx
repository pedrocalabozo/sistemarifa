'use client';

import { Suspense, createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import type { User as NextAuthUser } from 'next-auth';

export interface UserProfile extends NextAuthUser {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  idNumber: string;
  email: string;
  image?: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  updateProfile: (profileData: Pick<UserProfile, 'name' | 'lastName' | 'phone' | 'idNumber'>) => void;
  isProfileComplete: (userToCheck?: UserProfile | null) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthHandler({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [internalUser, setInternalUser] = useState<UserProfile | null>(null);
  const isLoadingAuth = status === 'loading';

  const checkProfileComplete = (currentUser: UserProfile | null | undefined): boolean => {
    if (!currentUser) return false;
    return !!(currentUser.name && currentUser.lastName && currentUser.phone && currentUser.idNumber);
  };

  useEffect(() => {
    if (session?.user) {
      const storedProfileData = localStorage.getItem(`rifaUser_${session.user.email}`);
      let profileData: Partial<UserProfile> = storedProfileData ? JSON.parse(storedProfileData) : {};

      const combinedUser: UserProfile = {
        id: session.user.id || session.user.email!,
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
        router.push(redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register');
      }
    } else if (!isLoadingAuth && !session?.user) {
      setInternalUser(null);
    }
  }, [session, isLoadingAuth, router, pathname, searchParams]);

  const login = async () => {
    const redirectPath = searchParams.get('redirect') || '/raffles';
    await signIn('google', { callbackUrl: redirectPath });
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/login' });
    setInternalUser(null);
  };

  const updateProfile = (profileData: Pick<UserProfile, 'name' | 'lastName' | 'phone' | 'idNumber'>) => {
    if (internalUser && internalUser.email) {
      const updatedUser = { ...internalUser, ...profileData };
      setInternalUser(updatedUser);
      localStorage.setItem(`rifaUser_${internalUser.email}`, JSON.stringify(profileData));

      if (checkProfileComplete(updatedUser)) {
        const redirect = searchParams.get('redirect');
        router.push(redirect || '/profile');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session?.user,
        user: internalUser,
        login,
        logout,
        updateProfile,
        isLoading: isLoadingAuth,
        isProfileComplete: () => checkProfileComplete(internalUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AuthHandler>{children}</AuthHandler>
    </Suspense>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};
