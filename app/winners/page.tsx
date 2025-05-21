import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Winner } from "@/types";
import { Crown, CalendarDays, TicketIcon, UserCircle, Gift } from "lucide-react"; 
import Image from "next/image";

const mockWinners: Winner[] = [
  {
    id: 'w1',
    raffleId: '4', 
    raffleTitle: 'Paquete Remodelación Hogar',
    userId: 'user123',
    userName: 'Maria G.',
    winningNumber: 345,
    prize: 'Voucher de Remodelación de Hogar de $5000',
    drawDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'w2',
    raffleId: 'prev-raffle-2',
    raffleTitle: 'Bonanza Electrónica Anterior',
    userId: 'user456',
    userName: 'Carlos R.',
    winningNumber: 78,
    prize: 'Última Consola de Videojuegos',
    drawDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'w3',
    raffleId: 'prev-raffle-3',
    raffleTitle: 'Sorteo Reloj de Lujo',
    userId: 'user789',
    userName: 'Ana S.',
    winningNumber: 812,
    prize: 'Reloj Suizo de Diseñador',
    drawDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function WinnersPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <Crown className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold">¡Nuestros Afortunados Ganadores!</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Felicitaciones a todos los participantes y especialmente a nuestros ganadores.
        </p>
      </div>

      {mockWinners.length > 0 ? (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {mockWinners.map((winner) => (
            <Card key={winner.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-center overflow-hidden">
              <div className="sm:w-1/3 p-4 flex justify-center">
                <Image 
                  src={`https://placehold.co/150x150.png`} 
                  alt="Trofeo Ganador" 
                  width={150} 
                  height={150} 
                  className="rounded-lg object-cover"
                  data-ai-hint="trofeo oro" 
                />
              </div>
              <div className="sm:w-2/3 w-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{winner.raffleTitle}</CardTitle>
                  <CardDescription>
                    Sorteado el: {new Date(winner.drawDate).toLocaleDateString('es-LA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <UserCircle className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-semibold">Ganador:</span> {winner.userName}
                  </div>
                  <div className="flex items-center">
                    <TicketIcon className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-semibold">Número Ganador:</span> {winner.winningNumber}
                  </div>
                   <div className="flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-semibold">Premio:</span> {winner.prize}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-xl py-8">
          No hay ganadores para mostrar en este momento. ¡Vuelve después del próximo sorteo!
        </p>
      )}
    </div>
  );
}
