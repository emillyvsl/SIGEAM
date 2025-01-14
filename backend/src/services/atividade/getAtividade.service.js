import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getAtividadeService = async (token) => {
  token = await retornaInfoToken(token);
  return prisma.atividade.findMany();
};

export { getAtividadeService };
