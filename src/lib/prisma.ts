import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  db: PrismaClient | undefined;
};

const db = globalForPrisma.db ?? new PrismaClient();

export default db;

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;
