import { handlers } from "@/auth" // <= IMPORTA EL OBJETO HANDLERS
export const { GET, POST } = handlers // <= DESESTRUCTURA GET Y POST DESDE HANDLERS
// export const runtime = "edge" // Opcional: si quieres usar Edge Functions para autenticación
