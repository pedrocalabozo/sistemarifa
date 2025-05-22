'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Ticket } from "lucide-react";

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
  </svg>
);

function AuthHandler() {
  const { login, isAuthenticated, isLoading, user, isProfileComplete } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectPath = searchParams.get('redirect');
      if (!isProfileComplete()) {
        router.push(redirectPath ? `/register?redirect=${encodeURIComponent(redirectPath)}` : '/register');
      } else {
        router.push(redirectPath || '/raffles');
      }
    }
  }, [isLoading, isAuthenticated, user, router, searchParams, isProfileComplete]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>Redirigiendo...</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <Ticket className="mx-auto h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">¡Bienvenido a RifaFacil!</CardTitle>
        <CardDescription>Inicia sesión para participar en rifas emocionantes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Button onClick={() => login()} className="w-full text-lg py-6" size="lg">
            <GoogleIcon />
            Iniciar sesión con Google
          </Button>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Al iniciar sesión, aceptas nuestros Términos de Servicio.
        </p>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AuthHandler />
    </Suspense>
  );
}
