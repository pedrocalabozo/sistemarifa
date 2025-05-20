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
  const formattedDrawDate = new Date(raffle.drawDate).toLocaleDateString('es-LA', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const statusBadgeText = {
    active: 'Activa',
    upcoming: 'Próxima',
    ended: 'Finalizada'
  };

  const buttonText = {
    active: 'Participar Ahora',
    upcoming: 'Ver Detalles',
    ended: 'Ver Resultados'
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={raffle.imageUrl}
            alt={raffle.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={raffle.dataAiHint || "premio rifa"}
          />
           <Badge 
             variant={raffle.status === 'active' ? 'default' : raffle.status === 'upcoming' ? 'secondary' : 'outline'} 
             className={`absolute top-2 right-2 ${raffle.status === 'active' ? 'bg-primary text-primary-foreground' : raffle.status === 'ended' ? 'bg-muted text-muted-foreground' : ''}`}
           >
             {statusBadgeText[raffle.status]}
           </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl mb-2 line-clamp-2">{raffle.title}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4 line-clamp-3">{raffle.shortDescription}</CardDescription>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            Precio por boleto: ${raffle.pricePerTicket}
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            Fecha del sorteo: {formattedDrawDate}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Ticket className="h-4 w-4 mr-2 text-primary" />
            Números máx: {raffle.maxNumbers}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild className="w-full" size="lg" disabled={raffle.status !== 'active' && raffle.status !== 'upcoming'}>
          <Link href={raffle.status === 'ended' ? `/winners` : `/raffles/${raffle.id}`}>
            <Zap className="mr-2 h-5 w-5" />
            {buttonText[raffle.status]}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
