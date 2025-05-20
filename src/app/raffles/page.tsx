'use client';

import { useEffect, useState } from 'react';
import { RaffleCard } from '@/components/raffles/RaffleCard';
import type { Raffle } from '@/types';
import { ListChecks } from 'lucide-react';

async function fetchRaffles(): Promise<Raffle[]> {
  const res = await fetch('/api/rifas');
  if (!res.ok) {
    // Esto activará el Error Boundary más cercano
    throw new Error('Error al cargar las rifas');
  }
  return res.json();
}

export default function RafflesPage() {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRaffles() {
      try {
        setIsLoading(true);
        const data = await fetchRaffles();
        setRaffles(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadRaffles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Cargando rifas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive text-xl">Error: {error}</p>
        <p className="text-muted-foreground mt-2">
          No pudimos cargar las rifas. Por favor, inténtalo de nuevo más tarde.
        </p>
      </div>
    );
  }
  
  const activeRaffles = raffles.filter(r => r.status === 'activa');
  const upcomingRaffles = raffles.filter(r => r.status === 'proxima');

  return (
    <div className="space-y-12">
      <div className="text-center">
        <ListChecks className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-2">Rifas Activas</h1>
        <p className="text-lg text-muted-foreground">
          ¡Revisa las rifas en curso y aprovecha tu oportunidad de ganar!
        </p>
      </div>

      {activeRaffles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeRaffles.map((raffle) => (
            <RaffleCard key={raffle.id} raffle={raffle} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-xl py-8">No hay rifas activas en este momento. ¡Vuelve pronto!</p>
      )}

      {upcomingRaffles.length > 0 && (
        <div>
          <h2 className="text-3xl font-semibold text-center mt-16 mb-8">Próximas Rifas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingRaffles.map((raffle) => (
              <RaffleCard key={raffle.id} raffle={raffle} />
            ))}
          </div>
        </div>
      )}
       {activeRaffles.length === 0 && upcomingRaffles.length === 0 && !isLoading && (
         <p className="text-center text-muted-foreground text-xl py-8">
           Actualmente no hay rifas disponibles. ¡Visítanos más tarde!
         </p>
       )}
    </div>
  );
}
