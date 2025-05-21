import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Raffle } from '@/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json({ message: 'ID de rifa inválido' }, { status: 400 });
  }

  try {
    const results = await query(
      'SELECT id_rifa as id, titulo as title, descripcion_corta as shortDescription, descripcion_larga as description, url_imagen as imageUrl, pista_ia_imagen as dataAiHint, precio_por_boleto as pricePerTicket, maximo_numeros as maxNumbers, fecha_sorteo as drawDate, estado as status FROM Rifas WHERE id_rifa = ?',
      [parseInt(id)]
    );
    
    // El helper `query` ya maneja la serialización
    const raffles: Raffle[] = results as Raffle[];

    if (raffles.length === 0) {
      return NextResponse.json({ message: 'Rifa no encontrada' }, { status: 404 });
    }
    
    return NextResponse.json(raffles[0]);
  } catch (error: any) {
    console.error(`Error al obtener la rifa ${id}:`, error);
    return NextResponse.json({ message: 'Error al obtener la rifa', error: error.message }, { status: 500 });
  }
}
