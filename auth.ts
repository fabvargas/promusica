import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { TursoAuthRepository } from "./backend/context/auth/infra/TursoAuthRepository";
import { TursoClient } from "./database/TursoClient";
import { LoginAuth } from "./backend/context/auth/app/LoginAuth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.AUTH_SECRET,

  callbacks: {

    async signIn({ profile, user }) {

      if (!profile?.email) return false

      const authRepository = new TursoAuthRepository();
      const db = TursoClient.getInstance();
      const useCase = new LoginAuth(authRepository, db);

      try {

        const credentials = await useCase.execute(profile.email);
        console.log(credentials, "desde auth")

        user.id = credentials.id;
        user.role = credentials.role;
        user.instrument= credentials.instrument ?? null

        return true;

      } catch(error) {
        console.error("Error during signIn:", error);
        return false;
      }

    },

    async jwt({ token, user }) {

      if (user) {
        token.userId = user.id
        token.role = user.role
        token.instrument = user.instrument
      }

      return token
    },

    async session({ session, token }) {

      session.user.id = token.userId
      session.user.role = token.role
      session.user.instrument = token.instrument 

      return session
    }

  }
})