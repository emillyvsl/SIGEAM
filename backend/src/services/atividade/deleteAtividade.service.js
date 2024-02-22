import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const deleteAtividadeService = async (id) => {
  const atividade = await prisma.atividade.findUnique({
    where: { id },
  });

  if (!atividade) throw new AppError("Atividade não encontrada", 404);

  return prisma.atividade.delete({
    where: { id },
  });
};
export { deleteAtividadeService };