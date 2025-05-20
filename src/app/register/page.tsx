'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type UserProfile } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, type FormEvent } from "react";
import { UserPlus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const { user, updateProfile, isAuthenticated, isLoading, isProfileComplete } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    idNumber: '', // Cedula
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    if (!isLoading && isAuthenticated && isProfileComplete) {
        // User already has a complete profile, redirect them, e.g., to profile or raffles
        router.push('/profile'); 
    }
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        idNumber: user.idNumber || '',
      });
    }
  }, [user, isAuthenticated, isLoading, isProfileComplete, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.lastName || !formData.phone || !formData.idNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }
    updateProfile(formData);
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully.",
    });
    // AuthContext's useEffect should handle redirect after profile completion
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>Please provide your details to continue using RifaFacil.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="idNumber">ID Number (Cédula)</Label>
              <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} required className="mt-1" />
            </div>
            <Button type="submit" className="w-full text-lg py-6" size="lg">
              <Save className="mr-2 h-5 w-5" />
              Save Information
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
