
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Raffle } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, CreditCard, Smartphone, TrendingUp, Ticket, DollarSign, CalendarDays, Info, HelpCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';


async function fetchRaffleById(id: string): Promise<Raffle | null> {
  const res = await fetch(`/api/rifas/${id}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error('Error al cargar los detalles de la rifa');
  }
  return res.json();
}


export default function RafflePage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, user, isLoading: authLoading, isProfileComplete } = useAuth();
  const { toast } = useToast();
  
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [numTickets, setNumTickets] = useState<number>(1);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoadingRaffle, setIsLoadingRaffle] = useState(true);
  const [errorRaffle, setErrorRaffle] = useState<string | null>(null);


  const raffleId = typeof params.id === 'string' ? params.id : '';

  useEffect(() => {
    async function loadRaffleDetails() {
      if (raffleId) {
        try {
          setIsLoadingRaffle(true);
          const foundRaffle = await fetchRaffleById(raffleId);
          if (foundRaffle) {
            setRaffle(foundRaffle);
            setTotalPrice(foundRaffle.pricePerTicket * numTickets); // Initial total price
            setErrorRaffle(null);
          } else {
            toast({ title: "Rifa no encontrada", description: "La rifa que buscas no existe o fue eliminada.", variant: "destructive"});
            router.push('/raffles');
          }
        } catch (err: any) {
          setErrorRaffle(err.message);
          toast({ title: "Error", description: err.message, variant: "destructive"});
        } finally {
          setIsLoadingRaffle(false);
        }
      } else {
        router.push('/raffles'); // No ID, redirect
      }
    }
    loadRaffleDetails();
  }, [raffleId, router, toast]); 

  useEffect(() => {
     if (raffle && numTickets > 0) {
        setTotalPrice(raffle.pricePerTicket * numTickets);
    } else if (raffle && numTickets === 0) {
        setTotalPrice(0);
    }
  }, [raffle, numTickets]);


  useEffect(() => {
    // No redirigir si authLoading es true
    if (authLoading) return;

    if (!isAuthenticated) {
      toast({ title: "Autenticación Requerida", description: "Por favor, inicia sesión para participar.", variant: "destructive"});
      router.push(`/login?redirect=/raffles/${raffleId}`);
    } else if (isAuthenticated && !isProfileComplete()) {
      toast({ title: "Perfil Incompleto", description: "Por favor, completa tu perfil para participar.", variant: "destructive"});
      router.push(`/register?redirect=/raffles/${raffleId}`);
    }
  }, [authLoading, isAuthenticated, isProfileComplete, router, raffleId, toast]);


  const handleNumTicketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (count >= 1 && count <= (raffle?.maxNumbers || 100) ) { 
      setNumTickets(count);
      setGeneratedNumbers([]); 
    } else if (e.target.value === '') {
        setNumTickets(0);
        setGeneratedNumbers([]);
    }
  };

  const handleGenerateNumbers = () => {
    if (!raffle || numTickets <= 0) return;
    if (numTickets > raffle.maxNumbers) {
      toast({ title: "Demasiados boletos", description: `Puedes seleccionar un máximo de ${raffle.maxNumbers} boletos para esta rifa.`, variant: "destructive"});
      return;
    }

    const numbers: number[] = [];
    while (numbers.length < numTickets) {
      const randomNumber = Math.floor(Math.random() * raffle.maxNumbers) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    setGeneratedNumbers(numbers.sort((a,b) => a-b));
    toast({ title: "¡Números Generados!", description: `${numTickets} números únicos han sido seleccionados para ti.` });
  };

  const navigateToPayment = (method: string) => {
    if (generatedNumbers.length === 0) {
      toast({ title: "Genera Números Primero", description: "Por favor, genera tus números de rifa antes de proceder al pago.", variant: "destructive"});
      return;
    }
    sessionStorage.setItem('rafflePurchaseInfo', JSON.stringify({raffleId: raffle?.id, raffleTitle: raffle?.title, numTickets, generatedNumbers, totalPrice}));
    router.push(`/raffles/${raffleId}/payment/${method}`);
  };

  if (isLoadingRaffle || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Cargando detalles de la rifa...</p>
      </div>
    );
  }

  if (errorRaffle) {
     return (
      <div className="text-center py-10">
        <p className="text-destructive text-xl">Error: {errorRaffle}</p>
        <p className="text-muted-foreground mt-2">
          No pudimos cargar los detalles de la rifa. Por favor, inténtalo de nuevo más tarde.
        </p>
        <Button onClick={() => router.push('/raffles')} className="mt-4">Volver a Rifas</Button>
      </div>
    );
  }
  
  if (!raffle) { 
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground text-xl">Rifa no encontrada.</p>
        <Button onClick={() => router.push('/raffles')} className="mt-4">Volver a Rifas</Button>
      </div>
    );
  }
  
  const formattedDrawDate = new Date(raffle.drawDate).toLocaleString('es-LA', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const isUserReadyToParticipate = isAuthenticated && isProfileComplete();
  const isRaffleActive = raffle.status === 'activa';
  const canParticipate = isUserReadyToParticipate && isRaffleActive;

  const statusBadgeText: Record<Raffle['status'], string> = {
    activa: 'Activa',
    proxima: 'Próxima',
    finalizada: 'Finalizada',
    cancelada: 'Cancelada'
  };

  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Rifas
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
            <Image
              src={raffle.imageUrl}
              alt={raffle.title}
              fill // Usar fill en lugar de layout="fill"
              sizes="(max-width: 768px) 100vw, 50vw" // Ayuda a Next.js a elegir el tamaño correcto
              style={{ objectFit: 'cover' }} // Usar style para objectFit
              className="transition-transform duration-500 hover:scale-105"
              data-ai-hint={raffle.dataAiHint || "detalle premio rifa"}
              priority // Considerar añadir priority si esta imagen es LCP
            />
            <Badge variant={raffle.status === 'activa' ? 'default' : raffle.status === 'proxima' ? 'secondary' : 'outline'} 
                   className={`absolute top-4 left-4 text-lg px-4 py-2 shadow-lg ${raffle.status === 'activa' ? 'bg-primary text-primary-foreground' : raffle.status === 'finalizada' ? 'bg-muted text-muted-foreground' : ''}`}>
              {statusBadgeText[raffle.status]}
            </Badge>
          </div>
          <div className="md:w-1/2">
            <CardHeader className="p-6 md:p-8">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-3">{raffle.title}</CardTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1 text-primary" /> Precio: ${raffle.pricePerTicket}/boleto</span>
                <span className="flex items-center"><Ticket className="h-4 w-4 mr-1 text-primary" /> Números Máx: {raffle.maxNumbers}</span>
                <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1 text-primary" /> Sorteo: {formattedDrawDate}</span>
              </div>
              <CardDescription className="text-base leading-relaxed">{raffle.description}</CardDescription>
            </CardHeader>
            
            {canParticipate && (
              <CardContent className="p-6 md:p-8 space-y-6 border-t">
                <div>
                  <Label htmlFor="numTickets" className="text-lg font-medium flex items-center mb-2">
                    <Info className="h-5 w-5 mr-2 text-primary"/>
                    ¿Cuántos boletos quieres?
                  </Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="numTickets"
                      type="number"
                      min="1"
                      max={raffle.maxNumbers}
                      value={numTickets === 0 ? '' : numTickets}
                      onChange={handleNumTicketsChange}
                      className="w-28 text-lg p-2 h-12"
                    />
                    <Button onClick={handleGenerateNumbers} size="lg" className="h-12 text-base">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Generar Números
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Precio Total: ${totalPrice.toFixed(2)}</p>
                </div>

                {generatedNumbers.length > 0 && (
                  <div className="p-4 bg-muted rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2 text-primary">Tus Números de la Suerte:</h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedNumbers.map(num => (
                        <Badge key={num} variant="secondary" className="text-base px-3 py-1">{num}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            )}

            {canParticipate && generatedNumbers.length > 0 && (
              <CardFooter className="p-6 md:p-8 border-t bg-secondary/30">
                <div className="w-full">
                   <h3 className="text-xl font-semibold mb-4 text-center text-primary-foreground bg-primary py-2 rounded-md">Elige Método de Pago</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => navigateToPayment('pago-movil')} variant="outline" size="lg" className="h-16 text-lg">
                      <Smartphone className="mr-2 h-6 w-6" /> Pago Móvil
                    </Button>
                    <Button onClick={() => navigateToPayment('crypto')} variant="outline" size="lg" className="h-16 text-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6 lucide lucide-bitcoin"><path d="M11.8 12.5H13.8C14.9 12.5 15.5 13.1 15.5 13.8C15.5 14.5 14.9 15.1 13.8 15.1H11.8V12.5Z"/><path d="M11.8 8.90002H13.5C14.6 8.90002 15.2 9.50002 15.2 10.2C15.2 10.9 14.6 11.5 13.5 11.5H11.8V8.90002Z"/><path d="M18.6 19.2C17.3 20.5 15.1 21.5 12.2 21.5C8.20001 21.5 5.30001 19.3 4.40001 16.6L3.90001 17.6L2.5 17.2L4.5 12.2L5 11.2L6.4 11.6L5.9 12.6C6.50001 14.5 8.40001 17.9 12.2 17.9C14.1 17.9 15.5 17.3 16.5 16.3L17 16.8V16.8L18.5 15.4L18 14.8C17.5 14.3 17.2 13.5 17.2 12.5L17.1 12.1C17.1 12.1 17.1 11.9 17.1 11.7C17.1 11.7 17.1 11.6 17.1 11.5C17.1 11.4 17.1 11.3 17.1 11.2C17.1 9.40002 17.1 7.40002 15.2 5.70002C14.7 5.20002 13.8 4.50002 12.2 4.50002C9.50001 4.50002 7.10001 7.20002 6.40001 9.30002L5.90001 8.30002L4.50001 8.70002L6.50001 13.8L7.00001 14.8L8.40001 14.4L7.90001 13.4C8.20001 12.3 8.70001 10.4 10.3 9.10002C10.6 8.80002 11.2 8.30002 12.2 8.30002C13.4 8.30002 13.8 8.90002 13.8 9.50002C13.8 10.1 13.4 10.6 12.9 10.8L12.7 10.9H10.3V12.5H12.7L12.9 12.6C13.4 12.8 13.8 13.3 13.8 13.9C13.8 14.5 13.4 15.1 12.2 15.1H10.3V16.7H12.2C14.9 16.7 16.6 15.2 16.6 13.2C16.6 13.1 16.6 13 16.6 12.9C16.6 12.9 16.6 12.9 16.6 12.9C16.6 12.9 16.6 12.9 16.6 12.9C16.6 12.8 16.6 12.7 16.6 12.6C16.6 12.6 16.6 12.6 16.6 12.5C16.6 11.5 16.1 10.5 15.3 9.80002L14.8 9.30002L16.2 7.90002L16.8 8.40002C17.8 9.50002 18.6 11.2 18.6 12.5C18.6 12.6 18.6 12.6 18.6 12.7C18.6 12.7 18.6 12.7 18.6 12.7C18.6 12.7 18.6 12.7 18.6 12.7C18.6 12.8 18.6 12.8 18.6 12.8C18.6 12.9 18.6 12.9 18.6 12.9C18.6 12.9 18.6 13 18.6 13C18.6 13 18.6 13 18.6 13C18.6 13 18.6 13 18.6 13C18.6 13.1 18.6 13.1 18.6 13.1C18.6 13.1 18.6 13.1 18.6 13.1C18.6 13.2 18.6 13.2 18.6 13.2C18.6 13.2 18.6 13.2 18.6 13.2C18.6 13.3 18.6 13.3 18.6 13.3C18.6 13.3 18.6 13.3 18.6 13.3C18.6 13.4 18.6 13.4 18.6 13.4C18.6 13.4 18.6 13.4 18.6 13.4C18.6 13.5 18.6 13.5 18.6 13.5C18.6 13.5 18.6 13.5 18.6 13.5C18.6 13.6 18.6 13.6 18.6 13.6C18.6 13.6 18.6 13.6 18.6 13.6C18.6 13.7 18.6 13.7 18.6 13.7C18.6 13.7 18.6 13.7 18.6 13.7C18.6 13.8 18.6 13.8 18.6 13.8C18.6 13.8 18.6 13.8 18.6 13.8C18.6 13.9 18.6 13.9 18.6 13.9C18.6 13.9 18.6 13.9 18.6 13.9C18.6 14 18.6 14 18.6 14L18.6 19.2Z"/></svg>
                       Cripto
                    </Button>
                    <Button onClick={() => navigateToPayment('zinli')} variant="outline" size="lg" className="h-16 text-lg">
                      <TrendingUp className="mr-2 h-6 w-6" /> Zinli
                    </Button>
                  </div>
                </div>
              </CardFooter>
            )}
            {!isRaffleActive && (
                <CardContent className="p-6 md:p-8 border-t text-center">
                    <p className="text-xl font-semibold text-muted-foreground">
                        {raffle.status === 'proxima' ? 'Esta rifa aún no está activa. ¡Vuelve pronto!' : raffle.status === 'finalizada' ? 'Esta rifa ha finalizado.' : 'Esta rifa está cancelada.'}
                    </p>
                    {raffle.status === 'finalizada' && (
                        <Button className="mt-4" asChild>
                            <Link href="/winners">Ver Ganadores</Link>
                        </Button>
                    )}
                </CardContent>
            )}
            {!authLoading && !isUserReadyToParticipate && isRaffleActive && (
                 <CardContent className="p-6 md:p-8 border-t text-center">
                    <p className="text-xl font-semibold text-muted-foreground">
                        Debes iniciar sesión y completar tu perfil para participar.
                    </p>
                    <Button className="mt-4" asChild>
                        <Link href={`/login?redirect=/raffles/${raffleId}`}>Iniciar Sesión</Link>
                    </Button>
                 </CardContent>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
