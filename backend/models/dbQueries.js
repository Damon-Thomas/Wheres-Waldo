import prisma from "./client.js";

const createGame = async (timeId, username) => {
  return prisma.Games.create({
    data: {
      clientId: timeId,
      username: username,
    },
  });
};

const foundCharacter = async (character, time) => {
  const game = await prisma.Games.findUnique({
    where: {
      clientId: time,
    },
  });

  console.log("game", game);
  const updatedFoundArray = [...game.foundArray];
  updatedFoundArray[character] = true;
  console.log("updatedFoundArray", updatedFoundArray);
  return prisma.Games.update({
    where: {
      clientId: time,
    },
    data: {
      foundArray: updatedFoundArray,
    },
  });
};

const addScore = async (score, username) => {
  return prisma.TopGames.create({
    data: {
      username: username,
      score: score,
    },
  });
};

const gameOver = async (time, username) => {
  const finishTime = Date.now();
  const game = await prisma.Games.findUnique({
    where: {
      clientId: time,
    },
  });
  if (!game) {
    throw new Error("Game not found.");
  }
  if (game.endTime) {
    throw new Error("Game already finished.");
  }
  if (time > finishTime) {
    throw new Error("Invalid time: time cannot be in the future.");
  }
  await prisma.Games.update({
    where: {
      clientId: time,
    },
    data: {
      endTime: finishTime.toString(),
    },
  });

  const score = Math.max(0, Math.round((finishTime - time) / 1000)); // Ensure score is non-negative
  await addScore(score, username);
  const result = {
    score: score,
  };
  return result;
};

const getHighScores = async () => {
  return await prisma.TopGames.findMany({
    orderBy: {
      score: "asc",
    },
    take: 10,
  });
};

const getAllScores = async () => {
  return await prisma.TopGames.findMany({
    orderBy: {
      score: "asc",
    },
  });
};

export { createGame, foundCharacter, gameOver, getHighScores, getAllScores };
