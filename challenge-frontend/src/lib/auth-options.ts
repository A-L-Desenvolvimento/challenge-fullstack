// eslint-disable-next-line import/no-cycle
import { authService } from '@/services/authService'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'

declare module 'next-auth' {
    interface User {
        access_token?: string;
        user?: {
            name?: string | null;
            email?: string | null;
        };
    }

    interface Session {
        access_token?: string;
        user?: {
            name?: string | null;
            email?: string | null;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'example@gmail.com',
                },
                password: {
                    label: 'password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                const response = await authService.signIn({
                    username: credentials?.email || '',
                    password: credentials?.password || '',
                })

                if (response.status === 401 || response.status === 400) {
                    return null
                }
                return response.data
            },
        }),
    ],
    callbacks: {

        async jwt({ token, session, user }) {
            const data = user || session
            if (data) {
                token.access_token = data.access_token
                token.user = data.user
            }
            return token
        },
        async session({ token, session }) {
            if (token) {
                session.access_token = token.access_token
                session.user = token.user
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/login', // Error code passed in query string as ?error=
        verifyRequest: '/', // (used for check email message)
        newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
    },

}

export const useAuth = NextAuth(authOptions)