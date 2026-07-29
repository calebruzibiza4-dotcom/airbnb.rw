import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "../../libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async signIn({ user, account, profile }: { user: any; account?: any; profile?: any }) {
            if (!user?.email) {
                return false;
            }

            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (existingUser) {
                const rawImage = [
                    profile?.image,
                    profile?.picture,
                    user?.image,
                ].find((value): value is string => typeof value === 'string' && value.trim().length > 0);

                if (rawImage && !existingUser.image) {
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: { image: rawImage },
                    });
                }
            }

            return true;
        },
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id;
                token.name = user.name || token.name;
                token.email = user.email || token.email;
                token.image = user.image || token.image;
                token.firstName = user.firstName || user.name?.split(' ')[0] || '';
                token.lastName = user.lastName || user.name?.split(' ').slice(1).join(' ') || '';
                token.phone = user.phone || null;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string | undefined;
                session.user.email = token.email as string | undefined;
                session.user.image = token.image as string | undefined;
                session.user.firstName = token.firstName as string | undefined;
                session.user.lastName = token.lastName as string | undefined;
                session.user.phone = token.phone as string | undefined;
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);