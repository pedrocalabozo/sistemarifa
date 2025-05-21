import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Raffle } from '@/types';

export async function GET() {
  try {
    const results = await query('SELECT id_rifa as id, titulo as title, descripcion_corta as shortDescription, descripcion_larga as description, url_imagen as imageUrl, pista_ia_imagen as dataAiHint, precio_por_boleto as pricePerTicket, maximo_numeros as maxNumbers, fecha_sorteo as drawDate, estado as status FROM Rifas');
    
    // El helper `query` ya se encarga de la serialización JSON adecuada, incluyendo fechas.
    // Solo nos aseguramos que el tipo sea el correcto.
    const raffles: Raffle[] = results as Raffle[];

    return NextResponse.json(raffles);
  } catch (error: any) {
    console.error('Error al obtener rifas:', error);
    return NextResponse.json({ message: 'Error al obtener rifas', error: error.message }, { status: 500 });
  }
}
