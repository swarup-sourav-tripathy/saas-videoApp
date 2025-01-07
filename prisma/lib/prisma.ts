import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  process.env.NODE_ENV === 'development'
    ? global.prisma || (global.prisma = new PrismaClient())
    : new PrismaClient();

export default prisma;