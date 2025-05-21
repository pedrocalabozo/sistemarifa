
import type { User as NextAuthUser } from 'next-auth';

export interface Raffle {
  id: string; 
  title: string;
  description: string; 
  shortDescription: string; 
  imageUrl: string; 
  dataAiHint?: string; 
  pricePerTicket: number; 
  maxNumbers: number; 
  drawDate: string; 
  status: 'activa' | 'proxima' | 'finalizada' | 'cancelada';
}

export interface Winner {
  id: string; 
  raffleId: string; 
  raffleTitle: string; 
  userId: string; 
  userName: string; 
  winningNumber?: number; 
  prize: string; 
  drawDate: string; 
}

export interface PurchasedTicket {
  id: string; 
  raffleId: string; 
  raffleTitle: string; 
  userId: string; 
  numbers: number[]; 
  purchaseDate: string; 
  totalAmount: number; 
  paymentMethod: 'Pago Movil' | 'Cripto Moneda' | 'Zinli'; 
  status: 'pendiente' | 'pagado' | 'fallido' | 'verificando' | 'cancelado';
  transactionId?: string; 
  paymentConfirmationDate?: string; 
}

// Extiende el usuario base de NextAuth
export interface UserProfile extends NextAuthUser {
  id: string; // ID de Google (viene de token.sub -> session.user.id)
  db_id?: string; // Nuestro ID interno de la tabla Usuarios (id_usuario)
  name: string; // Nombre (de DB si existe, sino de Google)
  lastName?: string | null; // Apellido (de DB)
  phone?: string | null; // Teléfono (de DB)
  idNumber?: string | null; // Número de ID/Cédula (de DB)
  email: string; // Email (de Google, verificado)
  image?: string | null; // URL de imagen (de Google o DB)
}
