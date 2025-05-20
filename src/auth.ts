
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Ensure these environment variables are set in your .env.local file
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret = process.env.AUTH_SECRET;

if (!googleClientId) {
  throw new Error(
    "Missing Google Client ID. Check GOOGLE_CLIENT_ID environment variable in your .env.local file."
  );
}
if (!googleClientSecret) {
  throw new Error(
    "Missing Google Client Secret. Check GOOGLE_CLIENT_SECRET environment variable in your .env.local file."
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

