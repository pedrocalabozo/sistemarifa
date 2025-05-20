export interface Raffle {
  id: string; // Debería ser string si viene de la API como id_rifa (INT) y se convierte
  title: string;
  description: string; // Corresponde a descripcion_larga
  shortDescription: string; // Corresponde a descripcion_corta
  imageUrl: string; // Corresponde a url_imagen
  dataAiHint?: string; // Corresponde a pista_ia_imagen
  pricePerTicket: number; // Corresponde a precio_por_boleto
  maxNumbers: number; // Corresponde a maximo_numeros
  drawDate: string; // Corresponde a fecha_sorteo (DATETIME de SQL -> ISO string en JSON)
  status: 'activa' | 'proxima' | 'finalizada' | 'cancelada'; // Corresponde a estado ENUM
}

export interface Winner {
  id: string; // id_ganador
  raffleId: string; // id_rifa
  raffleTitle: string; // Necesitará join o consulta separada
  userId: string; // id_usuario
  userName: string; // Necesitará join o consulta separada
  winningNumber?: number; // numero_ganador (puede ser null)
  prize: string; // premio_descripcion
  drawDate: string; // fecha_anuncio_ganador
}

export interface PurchasedTicket {
  id: string; // id_boleto
  raffleId: string; // id_rifa
  raffleTitle: string; // Para mostrar, necesitará join o consulta separada
  userId: string; // id_usuario
  numbers: number[]; // numeros_seleccionados (JSON array)
  purchaseDate: string; // fecha_compra
  totalAmount: number; // monto_total
  paymentMethod: 'Pago Movil' | 'Cripto Moneda' | 'Zinli'; // metodo_pago
  status: 'pendiente' | 'pagado' | 'fallido' | 'verificando' | 'cancelado'; // estado_pago
  transactionId?: string; // id_transaccion_pago
  paymentConfirmationDate?: string; // fecha_confirmacion_pago
}
