// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl: '/login?callbackUrl=/',
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin", //custom sign-in page
  },
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     if (account.provider === "google" && profile.verified_email === true)
  //       return true;
  //     else return false; // if you return false, access will be denied
  //   },
  //   async session(session, token) {
  //     session.user.id = token.id;
  //     console.log(session)
  //     return session;
  //   },
  //   async jwt(token, user) {
  //     if (user) token.id = user.id;
  //     return token;
  //   },
  // },
});
