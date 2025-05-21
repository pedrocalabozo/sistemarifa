
import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // Importa la configuración de auth
import { query } from '@/lib/db';
import type { UserProfile } from '@/types';

export async function PUT(request: Request) {
  const session = await auth(); // Obtiene la sesión del lado del servidor

  if (!session?.user) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  // Asegurarnos que user.id (google_id) o user.db_id (nuestro id_usuario) exista
  const userFromSession = session.user as UserProfile;
  const userIdToUpdate = userFromSession.db_id; // Usar nuestro id_usuario de la BD

  if (!userIdToUpdate) {
     return NextResponse.json({ message: 'ID de usuario no encontrado en la sesión' }, { status: 400 });
  }

  try {
    const { name, lastName, phone, idNumber } = await request.json();

    // Validación básica de los datos recibidos
    if (!name || !lastName || !phone || !idNumber) {
      return NextResponse.json({ message: 'Faltan campos requeridos: nombre, apellido, teléfono, número de ID' }, { status: 400 });
    }

    const result = await query(
      'UPDATE Usuarios SET nombre = ?, apellido = ?, telefono = ?, numero_id = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_usuario = ?',
      [name, lastName, phone, idNumber, userIdToUpdate]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Usuario no encontrado o datos sin cambios' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error: any) {
    console.error('Error al actualizar perfil:', error);
    return NextResponse.json({ message: 'Error al actualizar el perfil', error: error.message }, { status: 500 });
  }
}
