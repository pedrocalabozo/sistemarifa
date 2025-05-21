
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Ensure these environment variables are set in your .env.local file
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret = process.env.AUTH_SECRET;

if (!googleClientId) {
  console.error("Missing Google OAuth Client ID. Check GOOGLE_CLIENT_ID environment variable.");
  throw new Error(
    "Configuración de OAuth incompleta: Falta el ID de Cliente de Google. Revisa las variables de entorno."
  );
}
if (!googleClientSecret) {
  console.error("Missing Google OAuth Client Secret. Check GOOGLE_CLIENT_SECRET environment variable.");
  throw new Error(
    "Configuración de OAuth incompleta: Falta el Secreto de Cliente de Google. Revisa las variables de entorno."
  );
}
if (!authSecret) {
  console.error("Missing Auth Secret. Check AUTH_SECRET environment variable.");
  throw new Error(
    "Configuración de Autenticación incompleta: Falta el Secreto de Autenticación (AUTH_SECRET). Revisa las variables de entorno."
  );
}

export const {
  handlers, // This object contains the GET and POST methods
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  secret: authSecret,
  debug: process.env.NODE_ENV === 'development',
  events: {
    async error(message) {
      console.error("[NEXTAUTH_ERROR_EVENT]", message);
    }
  },
  pages: {
    signIn: '/login', // Optional: If you have a custom sign-in page
    error: '/api/auth/error', // Optional: Default NextAuth error page, or your custom one
  }
});
