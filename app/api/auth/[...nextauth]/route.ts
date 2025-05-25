import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const { id } = context.params; // Accediendo correctamente a los parámetros

  if (!id) {
    return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
  }

  return NextResponse.json({ mensaje: `El ID recibido es ${id}` });
}
