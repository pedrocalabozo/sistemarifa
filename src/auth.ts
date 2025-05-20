
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { 
  handlers, // This object contains GET and POST methods
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
  // pages: { // Optional: if you have custom pages
  //   signIn: '/login',
  // }
  // Ensure you have callbacks defined if you need to customize session/jwt
  // callbacks: {
  //   async session({ session, token }) {
  //     // Add custom properties to session
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     // Add custom properties to JWT
  //     return token;
  //   }
  // }
});
