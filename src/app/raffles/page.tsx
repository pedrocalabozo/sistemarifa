import { RaffleCard } from '@/components/raffles/RaffleCard';
import type { Raffle } from '@/types';
import { ListChecks } from 'lucide-react';

const mockRaffles: Raffle[] = [
  {
    id: '1',
    title: 'Gran Rifa Navideña',
    shortDescription: '¡Gana un paquete de vacaciones de lujo para dos!',
    description: 'Participa en nuestra Gran Rifa Navideña y ten la oportunidad de ganar un paquete de vacaciones de lujo todo incluido a un paraíso tropical. Incluye vuelos, alojamiento y dinero para gastos. ¡No te pierdas este viaje de ensueño!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'vacaciones viajes',
    pricePerTicket: 10,
    maxNumbers: 900,
    drawDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), 
    status: 'active',
  },
  {
    id: '2',
    title: 'Combo Tecnológico',
    shortDescription: 'Llévate el último smartphone, laptop y tablet.',
    description: '¡Actualiza tu tecnología con nuestra Rifa de Combo Tecnológico! Un afortunado ganador recibirá el smartphone más nuevo, una laptop de alto rendimiento y una tablet versátil. Perfecto para trabajar, jugar y mantenerse conectado.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dispositivos tecnologia',
    pricePerTicket: 5,
    maxNumbers: 500,
    drawDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), 
    status: 'active',
  },
  {
    id: '3',
    title: 'Auto para Escapada de Fin de Semana',
    shortDescription: '¡Llévate a casa un SUV compacto nuevo!',
    description: 'Imagina conducir un SUV compacto elegante y confiable. Esta rifa te da la oportunidad de ganar un auto nuevo, perfecto para la ciudad y aventuras de fin de semana. ¡Consigue tus boletos ahora!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'auto vehiculo',
    pricePerTicket: 20,
    maxNumbers: 900,
    drawDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), 
    status: 'upcoming',
  },
    {
    id: '4',
    title: 'Paquete Remodelación Hogar',
    shortDescription: 'Gana $5000 para la renovación de tus sueños.',
    description: '¡Transforma tu espacio vital con nuestra Rifa de Remodelación del Hogar! El ganador obtiene $5000 para gastar en muebles, decoración o renovaciones. Crea el hogar que siempre has querido.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'hogar interior',
    pricePerTicket: 15,
    maxNumbers: 900,
    drawDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), 
    status: 'ended',
  },
];

export default function RafflesPage() {
  const activeRaffles = mockRaffles.filter(r => r.status === 'active');
  const upcomingRaffles = mockRaffles.filter(r => r.status === 'upcoming');

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
    </div>
  );
}
