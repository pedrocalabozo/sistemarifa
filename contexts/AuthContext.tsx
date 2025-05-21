
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import type { UserProfile as AppUserProfile } from '@/types'; // Renombrado para evitar colisión
import { useToast } from '@/hooks/use-toast';

// La interfaz UserProfile aquí debe coincidir con la que se construye en el callback de session de NextAuth
interface AuthContextType {
  isAuthenticated: boolean;
  user: AppUserProfile | null; // Usar el tipo renombrado
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  updateProfile: (profileData: Pick<AppUserProfile, 'name' | 'lastName' | 'phone' | 'idNumber'>) => Promise<void>;
  isProfileComplete: (userToCheck?: AppUserProfile | null) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const isLoadingAuth = status === 'loading';
  const user = session?.user as AppUserProfile | null | undefined; // Castear a nuestro UserProfile extendido

  const checkProfileComplete = (currentUser: AppUserProfile | null | undefined): boolean => {
    if (!currentUser) return false;
    // El nombre, email, e imagen usualmente vienen de Google.
    // Los campos clave para "completar perfil" son los que no vienen de Google.
    return !!(currentUser.name && currentUser.lastName && currentUser.phone && currentUser.idNumber);
  };

  useEffect(() => {
    if (!isLoadingAuth && session?.user) { // Hay una sesión activa
      const appUser = session.user as AppUserProfile;
      if (!checkProfileComplete(appUser) && pathname !== '/register' && pathname !== '/login') {
        const redirect = searchParams.get('redirect');
        const redirectTo = redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register';
        router.push(redirectTo);
      }
    }
  }, [session, isLoadingAuth, router, pathname, searchParams]);

  const login = async () => {
    const redirectPath = searchParams.get('redirect') || '/raffles';
    await signIn('google', { callbackUrl: redirectPath });
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const updateProfile = async (profileData: Pick<AppUserProfile, 'name' | 'lastName' | 'phone' | 'idNumber'>) => {
    if (!user) {
      toast({ title: "Error", description: "No estás autenticado.", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el perfil');
      }
      
      // Actualizar la sesión de NextAuth para reflejar los cambios
      await updateSession(); 
      // `updateSession` debería recargar los datos del JWT/session del backend.
      // Si los callbacks de `auth.ts` están bien, la sesión actualizada tendrá los nuevos datos.

      toast({ title: "Perfil Actualizado", description: "Tu información ha sido actualizada exitosamente." });

      // La redirección ahora se basa en el estado actualizado de la sesión post-updateSession()
      // El useEffect se encargará de la lógica de redirección si es necesario,
      // o podemos redirigir explícitamente aquí si se completó el perfil.
      const updatedUser = session?.user as AppUserProfile; // Re-evaluar user de la sesión (aunque updateSession es async)
      if (checkProfileComplete(updatedUser)) { // Verificamos con el user potencialmente actualizado
         const redirect = searchParams.get('redirect');
         if (pathname === '/register') { // Solo redirigir desde /register si el perfil está ahora completo
            router.push(redirect || '/profile');
         } else if (redirect) { // Si había un redirect pendiente y el perfil está completo
            router.push(redirect);
         }
      }


    } catch (error: any) {
      console.error("Error al actualizar perfil:", error);
      toast({ title: "Error al Actualizar", description: error.message || "Ocurrió un problema al guardar tus datos.", variant: "destructive" });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!session?.user, 
      user: user || null, 
      login, 
      logout, 
      updateProfile, 
      isLoading: isLoadingAuth, 
      isProfileComplete: (userToCheck?: AppUserProfile | null) => checkProfileComplete(userToCheck !== undefined ? userToCheck : user)
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
