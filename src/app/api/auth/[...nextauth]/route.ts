import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Commercial Executive Portal",
      credentials: {
        email: {
          label: "Corporate Email",
          type: "email",
          placeholder: "admin@pmcommercial.com",
        },
        password: { label: "Access Token", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        // 1. Check database user if configured
        if (isDatabaseConfigured) {
          try {
            const user = await prisma.user.findUnique({
              where: { email },
            });

            if (user) {
              const isValid = await bcrypt.compare(password, user.password);
              if (isValid) {
                return {
                  id: user.id,
                  name: user.name || "Portfolio Administrator",
                  email: user.email,
                  role: user.role,
                };
              }
              return null;
            }
          } catch (dbErr) {
            console.warn("Prisma user lookup error, checking fallback:", dbErr);
          }
        }

        // 2. Fallback initial bootstrap admin credentials
        if (
          (email === "admin@karanholdings.com" || email === "admin@pmcommercial.com") &&
          (password === "admin" || password === "Admin123!")
        ) {
          return {
            id: "pm-admin-01",
            name: "Portfolio Administrator",
            email: "admin@pmcommercial.com",
            role: "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "pm_commercial_secret_jwt_auth_key_2025",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
