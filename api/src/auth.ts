import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { myPrisma } from "./prisma.js";
import "dotenv/config";

export const auth = betterAuth({
  appName: "socially-backoffice",
  database: prismaAdapter(myPrisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    },
  },
  rateLimit: {
    window: 60 * 60,
    max: 5,
  },

  baseURL: process.env.FRONTEND_URL,

  trustedOrigins: [process.env.FRONTEND_URL as string],

  emailAndPassword: {
    enabled: true,
  },
});
