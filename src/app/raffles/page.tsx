import { RaffleCard } from '@/components/raffles/RaffleCard';
import type { Raffle } from '@/types';
import { ListChecks } from 'lucide-react';

const mockRaffles: Raffle[] = [
  {
    id: '1',
    title: 'Grand Holiday Raffle',
    shortDescription: 'Win a luxury vacation package for two!',
    description: 'Participate in our Grand Holiday Raffle for a chance to win an all-inclusive luxury vacation package to a tropical paradise. Includes flights, accommodation, and spending money. Don\'t miss out on this dream getaway!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'vacation travel',
    pricePerTicket: 10,
    maxNumbers: 900,
    drawDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    status: 'active',
  },
  {
    id: '2',
    title: 'Tech Gadget Bundle',
    shortDescription: 'Get the latest smartphone, laptop, and tablet.',
    description: 'Upgrade your tech with our Gadget Bundle Raffle! One lucky winner will receive the newest smartphone, a high-performance laptop, and a versatile tablet. Perfect for work, play, and staying connected.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'gadgets technology',
    pricePerTicket: 5,
    maxNumbers: 500,
    drawDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
    status: 'active',
  },
  {
    id: '3',
    title: 'Weekend Getaway Car',
    shortDescription: 'Drive away in a brand new compact SUV!',
    description: 'Imagine cruising in a stylish and reliable compact SUV. This raffle gives you the chance to win a brand new car, perfect for city driving and weekend adventures. Get your tickets now!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'car vehicle',
    pricePerTicket: 20,
    maxNumbers: 900,
    drawDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    status: 'upcoming',
  },
    {
    id: '4',
    title: 'Home Makeover Package',
    shortDescription: 'Win $5000 towards your dream home renovation.',
    description: 'Transform your living space with our Home Makeover Raffle! The winner gets $5000 to spend on furniture, decor, or renovations. Create the home you\'ve always wanted.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'home interior',
    pricePerTicket: 15,
    maxNumbers: 900,
    drawDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
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
        <h1 className="text-4xl font-bold mb-2">Active Raffles</h1>
        <p className="text-lg text-muted-foreground">
          Check out the ongoing raffles and grab your chance to win!
        </p>
      </div>

      {activeRaffles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeRaffles.map((raffle) => (
            <RaffleCard key={raffle.id} raffle={raffle} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-xl py-8">No active raffles at the moment. Check back soon!</p>
      )}

      {upcomingRaffles.length > 0 && (
        <div>
          <h2 className="text-3xl font-semibold text-center mt-16 mb-8">Upcoming Raffles</h2>
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
