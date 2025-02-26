import prisma from "./client.js";

const createGame = async (timeId) => {
  return prisma.game.create({
    data: {
      clientId: timeId,
    },
  });
};

export { createGame };
