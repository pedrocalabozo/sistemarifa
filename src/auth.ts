import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers, // Este objeto contiene los métodos GET y POST
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Habilita logs de depuración en desarrollo
  // pages: {
  //   signIn: '/login', // Opcional: si quieres una página de inicio de sesión personalizada
  //   error: '/auth/error', // Opcional: si quieres una página de error de autenticación personalizada
  // }
});