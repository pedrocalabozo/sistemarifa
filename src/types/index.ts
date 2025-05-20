export interface Raffle {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  dataAiHint?: string; // Para sugerencias de imágenes de IA
  pricePerTicket: number;
  maxNumbers: number; // e.g., 900
  drawDate: string; // ISO string
  status: 'active' | 'upcoming' | 'ended';
}

export interface Winner {
  id: string;
  raffleId: string;
  raffleTitle: string;
  userId: string;
  userName: string;
  winningNumber: number;
  prize: string;
  drawDate: string;
}

export interface PurchasedTicket {
  id: string;
  raffleId: string;
  raffleTitle: string;
  numbers: number[];
  purchaseDate: string;
  totalAmount: number;
  paymentMethod: 'Pago Movil' | 'Cripto Moneda' | 'Zinli';
  status: 'pending' | 'paid' | 'cancelled';
}
