import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Winner } from "@/types";
import { Crown, CalendarDays, TicketIcon, UserCircle, Gift } from "lucide-react"; // Assuming TicketIcon for winning number
import Image from "next/image";

const mockWinners: Winner[] = [
  {
    id: 'w1',
    raffleId: '4', // Corresponds to "Home Makeover Package" which is 'ended'
    raffleTitle: 'Home Makeover Package',
    userId: 'user123',
    userName: 'Maria G.',
    winningNumber: 345,
    prize: '$5000 Home Renovation Voucher',
    drawDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'w2',
    raffleId: 'prev-raffle-2',
    raffleTitle: 'Previous Electronics Bonanza',
    userId: 'user456',
    userName: 'Carlos R.',
    winningNumber: 78,
    prize: 'Latest Gaming Console',
    drawDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'w3',
    raffleId: 'prev-raffle-3',
    raffleTitle: 'Luxury Watch Draw',
    userId: 'user789',
    userName: 'Ana S.',
    winningNumber: 812,
    prize: 'Designer Swiss Watch',
    drawDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function WinnersPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <Crown className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold">Our Lucky Winners!</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Congratulations to all participants and especially to our winners.
        </p>
      </div>

      {mockWinners.length > 0 ? (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {mockWinners.map((winner) => (
            <Card key={winner.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-center overflow-hidden">
              <div className="sm:w-1/3 p-4 flex justify-center">
                <Image 
                  src={`https://placehold.co/150x150.png`} 
                  alt="Winner Trophy" 
                  width={150} 
                  height={150} 
                  className="rounded-lg object-cover"
                  data-ai-hint="trophy gold" 
                />
              </div>
              <div className="sm:w-2/3 w-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{winner.raffleTitle}</CardTitle>
                  <CardDescription>
                    Drawn on: {new Date(winner.drawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <UserCircle className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-semibold">Winner:</span> {winner.userName}
                  </div>
                  <div className="flex items-center">
                    <TicketIcon className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-semibold">Winning Number:</span> {winner.winningNumber}
                  </div>
                   <div className="flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-semibold">Prize:</span> {winner.prize}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-xl py-8">
          No winners to display at the moment. Check back after the next draw!
        </p>
      )}
    </div>
  );
}
