import { PrismaClient } from "../generated/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient({} as any)
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client;
