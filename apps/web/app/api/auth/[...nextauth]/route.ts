import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@nexa.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization for bootstrap template
        if (credentials?.email === "admin@nexa.com" && credentials?.password === "password") {
          return { id: "1", name: "Admin User", email: "admin@nexa.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "nexa_super_secret_development_key_2026"
});

export { handler as GET, handler as POST };
