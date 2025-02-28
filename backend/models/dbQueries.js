import prisma from "./client.js";

const createGame = async (timeId) => {
  return prisma.Games.create({
    data: {
      clientId: timeId,
    },
  });
};

const foundCharacter = async (character, time) => {
  // Fetch the current foundArray
  console.log("time", time);
  const allGames = await prisma.Games.findMany();
  console.log("allGames", allGames);
  const game = await prisma.Games.findUnique({
    where: {
      clientId: time,
    },
  });

  // Update the foundArray
  console.log("game", game);
  const updatedFoundArray = [...game.foundArray];
  updatedFoundArray[character] = true;

  return prisma.Games.update({
    where: {
      clientId: time,
    },
    data: {
      foundArray: updatedFoundArray,
    },
  });
};

export { createGame, foundCharacter };
