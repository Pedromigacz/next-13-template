import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/client';
import { Adapter } from 'next-auth/adapters';

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: String(process.env.AUTH_SECRET),
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
