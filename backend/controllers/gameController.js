import { createGame } from "../models/dbQueries.js";

const gameStart = async (req, res) => {
  const { timeId } = req.body;
  try {
    const game = await createGame(timeId);
    res.json(game);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const submitCoord = async (req, res) => {
  const { x, y, character, time } = req.body;

  console.log("test", req.body);
  res.json({ character, x, y, time, tester: "tester" });
};

export { gameStart, submitCoord };
