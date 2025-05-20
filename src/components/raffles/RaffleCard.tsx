import type { Raffle } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, CalendarDays, DollarSign, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RaffleCardProps {
  raffle: Raffle;
}

export function RaffleCard({ raffle }: RaffleCardProps) {
  const formattedDrawDate = new Date(raffle.drawDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={raffle.imageUrl}
            alt={raffle.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={raffle.dataAiHint || "raffle prize"}
          />
           {raffle.status === 'active' && <Badge variant="default" className="absolute top-2 right-2 bg-primary text-primary-foreground">Active</Badge>}
           {raffle.status === 'upcoming' && <Badge variant="secondary" className="absolute top-2 right-2">Upcoming</Badge>}
           {raffle.status === 'ended' && <Badge variant="outline" className="absolute top-2 right-2 bg-muted text-muted-foreground">Ended</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl mb-2 line-clamp-2">{raffle.title}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4 line-clamp-3">{raffle.shortDescription}</CardDescription>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            Price per ticket: ${raffle.pricePerTicket}
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            Draw date: {formattedDrawDate}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Ticket className="h-4 w-4 mr-2 text-primary" />
            Max numbers: {raffle.maxNumbers}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild className="w-full" size="lg" disabled={raffle.status !== 'active'}>
          <Link href={`/raffles/${raffle.id}`}>
            <Zap className="mr-2 h-5 w-5" />
            {raffle.status === 'active' ? 'Participate Now' : raffle.status === 'upcoming' ? 'View Details' : 'View Results'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
