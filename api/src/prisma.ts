import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  myPrisma?: PrismaClient;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const adapter = new PrismaPg({
  connectionString,
});

export const myPrisma =
  globalForPrisma.myPrisma ??
  new PrismaClient({
    adapter,
    log: ["warn", "error"],
  });

// Singleton pour évitez le hot reload car on utilise le hot reload //
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.myPrisma = myPrisma;
}
