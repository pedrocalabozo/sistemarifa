
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";
import type { UserProfile } from "@/types"; // Asegúrate que UserProfile esté bien definida aquí

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret = process.env.AUTH_SECRET;

if (!googleClientId) {
  throw new Error(
    "Falta el ID de Cliente de Google. Revisa la variable de entorno GOOGLE_CLIENT_ID en tu archivo .env.local."
  );
}
if (!googleClientSecret) {
  throw new Error(
    "Falta el Secreto de Cliente de Google. Revisa la variable de entorno GOOGLE_CLIENT_SECRET en tu archivo .env.local."
  );
}
if (!authSecret) {
  throw new Error(
    "Falta el Secreto de Autenticación. Revisa la variable de entorno AUTH_SECRET en tu archivo .env.local. Debería ser una cadena aleatoria fuerte."
  );
}

export const {
  handlers,
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
  pages: {
    signIn: '/login',
    error: '/api/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // `user`, `account`, `profile` solo están disponibles en el primer inicio de sesión.
      if (user && account && profile) {
        // `user.id` es el google_id
        const googleId = user.id as string;
        const email = user.email as string;
        const nameFromGoogle = user.name as string;
        const imageFromGoogle = user.image as string;

        try {
          let dbUserResults = await query('SELECT id_usuario, nombre, apellido, telefono, numero_id, imagen_url FROM Usuarios WHERE google_id = ?', [googleId]) as any[];
          let dbUser = dbUserResults[0];

          if (!dbUser) {
            // Crear nuevo usuario en la BD
            const insertResult = await query(
              'INSERT INTO Usuarios (google_id, email, nombre, imagen_url) VALUES (?, ?, ?, ?)',
              [googleId, email, nameFromGoogle, imageFromGoogle]
            ) as any;
            
            // Recuperar el usuario recién insertado para obtener su id_usuario y otros campos por defecto
            dbUserResults = await query('SELECT id_usuario, nombre, apellido, telefono, numero_id, imagen_url FROM Usuarios WHERE id_usuario = ?', [insertResult.insertId]) as any[];
            dbUser = dbUserResults[0];
          }

          if (dbUser) {
            token.db_id = dbUser.id_usuario.toString(); // id_usuario de nuestra BD
            token.name = dbUser.nombre || nameFromGoogle; // Usar nombre de DB si existe, sino el de Google
            token.lastName = dbUser.apellido;
            token.phone = dbUser.telefono;
            token.idNumber = dbUser.numero_id;
            token.email = email; // Siempre el de Google, ya que es el verificado
            token.picture = dbUser.imagen_url || imageFromGoogle; // Usar imagen de DB si la tuviéramos personalizada, sino la de Google
            token.sub = googleId; // 'sub' es el estándar para el ID del sujeto en JWT
          }
        } catch (error) {
          console.error("Error en callback JWT interactuando con DB:", error);
          // Decide cómo manejar el error, ¿permitir login sin datos de DB o bloquear?
          // Por ahora, permitimos con datos básicos de Google si falla la DB.
          token.email = email;
          token.name = nameFromGoogle;
          token.picture = imageFromGoogle;
          token.sub = googleId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // `token` viene del callback `jwt`
      // El `id` en `session.user.id` por defecto es `token.sub`
      if (token.sub && session.user) {
        session.user.id = token.sub as string; // google_id
      }
      if (token.db_id && session.user) {
        (session.user as UserProfile).db_id = token.db_id as string;
      }
      if (token.name && session.user) {
        session.user.name = token.name as string;
      }
      if (session.user) { // lastName puede ser null
        (session.user as UserProfile).lastName = token.lastName as string | null;
      }
      if (session.user) { // phone puede ser null
         (session.user as UserProfile).phone = token.phone as string | null;
      }
      if (session.user) { // idNumber puede ser null
        (session.user as UserProfile).idNumber = token.idNumber as string | null;
      }
      if (token.email && session.user) {
        session.user.email = token.email as string;
      }
      if (token.picture && session.user) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Aquí podrías hacer algo cuando el usuario inicia sesión, como registrar el evento.
      // Si `isNewUser` fuera provisto de forma fiable por el provider, podrías usarlo.
      // Pero como ya manejamos la creación en `jwt`, no es estrictamente necesario aquí para eso.
    },
    async error(message) {
      console.error("[NEXTAUTH_ERROR_EVENT]", message);
    }
  }
});
