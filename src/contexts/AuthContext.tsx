'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface UserProfile {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  idNumber: string; // Cedula
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, name?: string) 
    => void;
  logout: () => void;
  updateProfile: (profileData: Omit<UserProfile, 'id' | 'email'>) => void;
  isProfileComplete: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('rifaUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !isProfileComplete(user) && pathname !== '/register' && pathname !== '/login') {
        // Allow staying on /login if they somehow landed there while authenticated but incomplete
        router.push('/register');
    }
  }, [isAuthenticated, user, isLoading, router, pathname]);

  const isProfileComplete = (currentUser: UserProfile | null): boolean => {
    return !!(currentUser?.name && currentUser.lastName && currentUser.phone && currentUser.idNumber);
  };

  const login = (email: string, nameFromGoogle?: string) => {
    const existingUser = localStorage.getItem('rifaUser');
    if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if(parsedUser.email === email) {
            setUser(parsedUser);
            setIsAuthenticated(true);
            if (!isProfileComplete(parsedUser)) {
                router.push('/register');
            } else {
                const redirectPath = new URLSearchParams(window.location.search).get('redirect') || '/raffles';
                router.push(redirectPath);
            }
            return;
        }
    }

    const newUser: UserProfile = {
      id: Date.now().toString(), 
      email,
      name: nameFromGoogle || '',
      lastName: '',
      phone: '',
      idNumber: '',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('rifaUser', JSON.stringify(newUser));

    const redirectPath = new URLSearchParams(window.location.search).get('redirect');
    if (!isProfileComplete(newUser)) {
      router.push(redirectPath ? `/register?redirect=${redirectPath}` : '/register');
    } else {
      router.push(redirectPath || '/raffles');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('rifaUser');
    router.push('/login');
  };

  const updateProfile = (profileData: Omit<UserProfile, 'id' | 'email'>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('rifaUser', JSON.stringify(updatedUser));
      if(isProfileComplete(updatedUser)) {
        const redirectPath = new URLSearchParams(window.location.search).get('redirect');
        router.push(redirectPath || '/profile');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfile, isLoading, isProfileComplete: isProfileComplete(user) }}>
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
