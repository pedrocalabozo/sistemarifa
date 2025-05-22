'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { UserPlus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function RegisterHandler() {
  const { user, updateProfile, isAuthenticated, isLoading, isProfileComplete } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    idNumber: '',
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login'); // Redirige si no está autenticado
      return;
    }

    if (!isLoading && isAuthenticated && isProfileComplete()) {
      const redirectPath = searchParams.get('redirect') || '/profile';
      router.push(redirectPath);
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        idNumber: user.idNumber || '',
      });
    }
  }, [user, isAuthenticated, isLoading, isProfileComplete, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.lastName || !formData.phone || !formData.idNumber) {
      toast({
        title: "Información Faltante",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    updateProfile(formData);
    toast({
      title: "Perfil Actualizado",
      description: "Tu información ha sido guardada exitosamente.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <UserPlus className="mx-auto h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">Completa Tu Perfil</CardTitle>
        <CardDescription>
          {user?.email && <p className="mb-2">Correo: {user.email}</p>}
          Por favor, proporciona los datos restantes para continuar usando RifaFacil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />

          <Label htmlFor="lastName">Apellido</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <Label htmlFor="phone">Número de Teléfono</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />

          <Label htmlFor="idNumber">Número de ID (Cédula)</Label>
          <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} required />

          <Button type="submit" className="w-full text-lg py-6" size="lg">
            <Save className="mr-2 h-5 w-5" />
            Guardar Información
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RegisterHandler />
    </Suspense>
  );
}
