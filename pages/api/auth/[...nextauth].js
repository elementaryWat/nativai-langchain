// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl: "/login?callbackUrl=/",
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin", //custom sign-in page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutos
  },
  callbacks: {
    async session(session, token) {
      // Al iniciar sesión, configuramos un temporizador para cerrar la sesión después de un tiempo de inactividad
      const inactivityTimeout = 30 * 60 * 1000 // 30 minutos en milisegundos
      inactivityTimer = setTimeout(() => {
        // Cierra la sesión después del tiempo de inactividad
        session.accessToken = null
      }, inactivityTimeout)
      return session
    },
    async jwt(token, user) {
      // Restablece el temporizador de inactividad cada vez que se realiza una acción que requiera autenticación
      clearTimeout(inactivityTimer)
      return token
    },
  },
});
