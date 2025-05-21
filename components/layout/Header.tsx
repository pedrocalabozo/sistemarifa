
'use client';

import Link from 'next/link';
import { Ticket, LogIn, User, Crown, BookOpen, ListChecks } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Header() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();

  const getInitials = (name?: string, lastName?: string) => {
    if (name && lastName) return `${name[0]}${lastName[0]}`.toUpperCase();
    if (name) return name.substring(0,2).toUpperCase();
    return "U";
  }

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center">
          <Ticket className="mr-2 h-7 w-7" />
          RifaFacilt
        </Link>
        <nav className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/raffles" className="flex items-center">
              <ListChecks className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> <span className="hidden md:inline">Rifas</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/winners" className="flex items-center">
              <Crown className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> <span className="hidden md:inline">Ganadores</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/rules" className="flex items-center">
              <BookOpen className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> <span className="hidden md:inline">Reglas</span>
            </Link>
          </Button>
          {isLoading ? (
            <div className="h-10 w-20 bg-muted rounded-md animate-pulse"></div>
          ) : isAuthenticated && user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    {user.image ? (
                       <AvatarImage src={user.image} alt={user.name || 'Usuario'} />
                    ) : (
                       <AvatarImage src={`https://placehold.co/40x40.png?text=${getInitials(user.name, user.lastName)}`} alt={user.name || 'Usuario'} data-ai-hint="avatar perfil" />
                    )}
                    <AvatarFallback>{getInitials(user.name, user.lastName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name} {user.lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push('/login')} className="flex items-center">
              <LogIn className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> Iniciar Sesión
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
