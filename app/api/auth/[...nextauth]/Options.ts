//@ts-nocheck
import { NextAuthOptions } from "next-auth"
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        //添加 局域网ip 192.168 或者localhost 
        // 添加 CredentialsProvider 仅在本地开发环境中使用
        (process.env.NEXTAUTH_URL?.includes("localhost") || process.env.NEXTAUTH_URL?.includes("192.168")) && CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                name: { label: "name", type: "text" },
                image: { label: "image", type: "text" },
            },

            async authorize(credentials) {
                const email = credentials?.email?.trim()

                if (!email) return null

                const existingUser = await prisma.user.findUnique({
                    where: { email }
                })

                if (existingUser) return existingUser

                const newUser = await prisma.user.create({
                    data: {
                        email,
                        name: credentials?.name ?? null,
                        image: credentials?.image ?? null,
                    }
                })

                return newUser
            }
        }),
    ],
    callbacks: {
        session: async ({ session, token }: any) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ user, token }: any) => {
            if (user?.id) {
                token.sub = user.id;
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
}  
