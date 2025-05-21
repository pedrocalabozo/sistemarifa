'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Hash, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PurchaseInfo {
  raffleId: string;
  raffleTitle: string;
  numTickets: number;
  generatedNumbers: number[];
  totalPrice: number;
}

export default function PaymentSummary() {
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);

  useEffect(() => {
    const storedInfo = sessionStorage.getItem('rafflePurchaseInfo');
    if (storedInfo) {
      setPurchaseInfo(JSON.parse(storedInfo));
    }
  }, []);

  if (!purchaseInfo) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Cargando Resumen de Compra...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg bg-secondary/20">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center">
          <Ticket className="mr-3 h-7 w-7" />
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Rifa: {purchaseInfo.raffleTitle}</h3>
        </div>
        <div className="flex items-center">
          <Hash className="mr-2 h-5 w-5 text-primary" />
          <span className="font-medium">Número de Boletos:</span>
          <span className="ml-auto text-lg font-semibold">{purchaseInfo.numTickets}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-primary" />
          <span className="font-medium">Precio Total:</span>
          <span className="ml-auto text-lg font-semibold">${purchaseInfo.totalPrice.toFixed(2)}</span>
        </div>
        <div>
          <h4 className="font-medium mb-2 flex items-center">
             <Ticket className="mr-2 h-5 w-5 text-primary" />
            Tus Números Seleccionados:
          </h4>
          <div className="flex flex-wrap gap-2">
            {purchaseInfo.generatedNumbers.map(num => (
              <Badge key={num} variant="default" className="text-sm px-2.5 py-1">{num}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
