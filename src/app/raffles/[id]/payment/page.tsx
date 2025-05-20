'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// This page can either redirect to the first payment method or show a selection UI.
// For simplicity, we'll redirect to pago-movil.
export default function DefaultPaymentPage() {
  const router = useRouter();
  const params = useParams();
  const raffleId = typeof params.id === 'string' ? params.id : '';

  useEffect(() => {
    if (raffleId) {
      router.replace(`/raffles/${raffleId}/payment/pago-movil`);
    }
  }, [raffleId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
      <p className="text-muted-foreground">Loading payment options...</p>
    </div>
  );
}
