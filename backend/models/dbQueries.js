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
  const score = Math.round((finishTime - time) / 1000);
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
