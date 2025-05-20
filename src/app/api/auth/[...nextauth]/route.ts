
import { handlers } from "@/auth"; // Asegúrate que @/auth exporte 'handlers'

// handlers es un objeto que contiene los métodos GET y POST
export const { GET, POST } = handlers;

// export const runtime = "edge" // Opcional: si quieres usar Edge Functions para autenticación
