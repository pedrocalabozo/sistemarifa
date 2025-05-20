
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const authSecret = process.env.AUTH_SECRET;

if (!googleClientId) {
  throw new Error(
    "Missing Google OAuth Client ID. Check AUTH_GOOGLE_ID environment variable in your .env.local file."
  );
}
if (!googleClientSecret) {
  throw new Error(
    "Missing Google OAuth Client Secret. Check AUTH_GOOGLE_SECRET environment variable in your .env.local file."
  );
}
if (!authSecret) {
  throw new Error(
    "Missing Auth Secret. Check AUTH_SECRET environment variable in your .env.local file. It should be a strong random string."
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
  // pages: {
  //   signIn: '/login', // Opcional: si quieres una página de inicio de sesión personalizada
  //   error: '/auth/error', // Opcional: si quieres una página de error de autenticación personalizada
  // }
});
