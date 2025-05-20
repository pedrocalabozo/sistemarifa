
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import type { Provider } from 'next-auth/providers';

// Lista de proveedores de autenticación
const providers: Provider[] = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    // Opcional: Configurar qué información se solicita a Google
    // authorization: { params: { scope: "openid email profile https://www.googleapis.com/auth/userinfo.profile" } },
  }),
  // Puedes añadir más proveedores aquí si lo deseas
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  // Opcional: Configurar callbacks para personalizar el comportamiento
  callbacks: {
    // async jwt({ token, user, account }) {
    //   // Persistir el accessToken o idToken de OAuth si es necesario
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.idToken = account.id_token; // Si Google lo provee y lo necesitas
    //   }
    //   if (user) {
    //     token.id = user.id; // Asegúrate que el id del usuario esté en el token
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   // Enviar propiedades al cliente, como un access_token y user.id desde el token JWT
    //   if (token.accessToken) {
    //     (session as any).accessToken = token.accessToken;
    //   }
    //   if (token.id && session.user) {
    //     session.user.id = token.id as string;
    //   }
    //   return session;
    // },
    // async redirect({ url, baseUrl }) {
    //   // Permite redirecciones relativas después del inicio de sesión
    //   if (url.startsWith('/')) return `${baseUrl}${url}`
    //   // Permite redirecciones a otros dominios si la URL es absoluta y segura
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // }
  },
  // Opcional: Configurar una página de inicio de sesión personalizada si la necesitas
  // pages: {
  //   signIn: '/login',
  //   // error: '/auth/error', // Página para mostrar errores de autenticación
  // },
  // Opcional: para depuración en desarrollo
  // debug: process.env.NODE_ENV === 'development',
});
