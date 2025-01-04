import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `prisma` to persist across module reloads in development
  var prisma: PrismaClient | undefined;
}

const prisma =
  process.env.NODE_ENV
    ? new PrismaClient()
    : global.prisma || (global.prisma = new PrismaClient());

export default prisma;
