'use client';
import { ArrowLeft, CreditCard, Smartphone, TrendingUp, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ReactNode } from 'react';

export default function PaymentLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const raffleId = typeof params.id === 'string' ? params.id : '';

  const getActiveTab = () => {
    if (pathname.includes('pago-movil')) return 'pago-movil';
    if (pathname.includes('crypto')) return 'crypto';
    if (pathname.includes('zinli')) return 'zinli';
    return 'pago-movil'; // Default or handle as error
  };

  const handleTabChange = (value: string) => {
    router.push(`/raffles/${raffleId}/payment/${value}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => router.push(`/raffles/${raffleId}`)} className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Raffle Details
        </Button>
        <h1 className="text-3xl font-bold text-center sm:text-left w-full sm:w-auto">
            <Ticket className="inline-block mr-2 h-8 w-8 text-primary" />
            Confirm Your Purchase
        </h1>
      </div>
      
      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12">
          <TabsTrigger value="pago-movil" className="py-3 text-base sm:text-sm">
            <Smartphone className="mr-2 h-5 w-5" /> Pago Móvil
          </TabsTrigger>
          <TabsTrigger value="crypto" className="py-3 text-base sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-bitcoin"><path d="M11.8 12.5H13.8C14.9 12.5 15.5 13.1 15.5 13.8C15.5 14.5 14.9 15.1 13.8 15.1H11.8V12.5Z"/><path d="M11.8 8.90002H13.5C14.6 8.90002 15.2 9.50002 15.2 10.2C15.2 10.9 14.6 11.5 13.5 11.5H11.8V8.90002Z"/><path d="M18.6 19.2C17.3 20.5 15.1 21.5 12.2 21.5C8.20001 21.5 5.30001 19.3 4.40001 16.6L3.90001 17.6L2.5 17.2L4.5 12.2L5 11.2L6.4 11.6L5.9 12.6C6.50001 14.5 8.40001 17.9 12.2 17.9C14.1 17.9 15.5 17.3 16.5 16.3L17 16.8V16.8L18.5 15.4L18 14.8C17.5 14.3 17.2 13.5 17.2 12.5L17.1 12.1C17.1 12.1 17.1 11.9 17.1 11.7C17.1 11.7 17.1 11.6 17.1 11.5C17.1 11.4 17.1 11.3 17.1 11.2C17.1 9.40002 17.1 7.40002 15.2 5.70002C14.7 5.20002 13.8 4.50002 12.2 4.50002C9.50001 4.50002 7.10001 7.20002 6.40001 9.30002L5.90001 8.30002L4.50001 8.70002L6.50001 13.8L7.00001 14.8L8.40001 14.4L7.90001 13.4C8.20001 12.3 8.70001 10.4 10.3 9.10002C10.6 8.80002 11.2 8.30002 12.2 8.30002C13.4 8.30002 13.8 8.90002 13.8 9.50002C13.8 10.1 13.4 10.6 12.9 10.8L12.7 10.9H10.3V12.5H12.7L12.9 12.6C13.4 12.8 13.8 13.3 13.8 13.9C13.8 14.5 13.4 15.1 12.2 15.1H10.3V16.7H12.2C14.9 16.7 16.6 15.2 16.6 13.2C16.6 13.1 16.6 13 16.6 12.9C16.6 12.9 16.6 12.9 16.6 12.9C16.6 12.9 16.6 12.9 16.6 12.9C16.6 12.8 16.6 12.7 16.6 12.6C16.6 12.6 16.6 12.6 16.6 12.5C16.6 11.5 16.1 10.5 15.3 9.80002L14.8 9.30002L16.2 7.90002L16.8 8.40002C17.8 9.50002 18.6 11.2 18.6 12.5C18.6 12.6 18.6 12.6 18.6 12.7C18.6 12.7 18.6 12.7 18.6 12.7C18.6 12.7 18.6 12.7 18.6 12.7C18.6 12.8 18.6 12.8 18.6 12.8C18.6 12.9 18.6 12.9 18.6 12.9C18.6 12.9 18.6 13 18.6 13C18.6 13 18.6 13 18.6 13C18.6 13 18.6 13 18.6 13C18.6 13.1 18.6 13.1 18.6 13.1C18.6 13.1 18.6 13.1 18.6 13.1C18.6 13.2 18.6 13.2 18.6 13.2C18.6 13.2 18.6 13.2 18.6 13.2C18.6 13.3 18.6 13.3 18.6 13.3C18.6 13.3 18.6 13.3 18.6 13.3C18.6 13.4 18.6 13.4 18.6 13.4C18.6 13.4 18.6 13.4 18.6 13.4C18.6 13.5 18.6 13.5 18.6 13.5C18.6 13.5 18.6 13.5 18.6 13.5C18.6 13.6 18.6 13.6 18.6 13.6C18.6 13.6 18.6 13.6 18.6 13.6C18.6 13.7 18.6 13.7 18.6 13.7C18.6 13.7 18.6 13.7 18.6 13.7C18.6 13.8 18.6 13.8 18.6 13.8C18.6 13.8 18.6 13.8 18.6 13.8C18.6 13.9 18.6 13.9 18.6 13.9C18.6 13.9 18.6 13.9 18.6 13.9C18.6 14 18.6 14 18.6 14L18.6 19.2Z"/></svg>
             Crypto
          </TabsTrigger>
          <TabsTrigger value="zinli" className="py-3 text-base sm:text-sm">
            <TrendingUp className="mr-2 h-5 w-5" /> Zinli
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-2 p-1 md:p-2">{children}</div>
    </div>
  );
}
