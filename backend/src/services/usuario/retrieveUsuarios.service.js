import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
const prisma = new PrismaClient();

const retrieveUsuariosService = async (id) => {
  id = parseInt(id);
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      endereco: true,
      dataNascimento: true,
    },
  });
  if (!usuario) {
    throw new AppError("Usuário não encontrado", 404);
  }
  return usuario;
};

export { retrieveUsuariosService };
