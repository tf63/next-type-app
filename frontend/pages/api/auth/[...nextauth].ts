import NextAuth, { NextAuthOptions } from 'next-auth'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '../../../lib/prisma'

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    }),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        })
    ],

    secret: process.env.SECRET,

    session: {
        strategy: 'database',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24 // 24 hours
    },

    useSecureCookies: process.env.NODE_ENV === 'production',

    pages: {
        signIn: 'login'
    },

    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl
        },
        async session({ session, user }) {
            if (session?.user) session.user.id = user.id
            return session
        }
    }
}

export default NextAuth(authOptions)
