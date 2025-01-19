// src/services/Database.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export { prisma, connectDatabase };
