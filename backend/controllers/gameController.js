import { createGame, foundCharacter } from "../models/dbQueries.js";

const masterCoords = {
  Easy: { xmin: 775, xmax: 820, ymin: 1150, ymax: 1200 },
  Med: { xmin: 2700, xmax: 2760, ymin: 1725, ymax: 1800 },
  Hard: { xmin: 2330, xmax: 2390, ymin: 770, ymax: 860 },
};

const gameStart = async (req, res) => {
  console.log("gameStart", req.body);
  const { gameId } = req.body;
  try {
    const game = await createGame(gameId.toString());
    console.log("game created", game);
    res.json(game);
  } catch (error) {
    console.log("error", error);
    res.json({ error: error.message });
  }
};

const submitCoord = async (req, res) => {
  const { x, y, character, time } = req.body;
  console.log("submitCoord", x, y, character, time);
  let didFind = false;
  let foundArray;

  if (
    character === 0 &&
    x >= masterCoords.Easy.xmin &&
    x <= masterCoords.Easy.xmax &&
    y >= masterCoords.Easy.ymin &&
    y <= masterCoords.Easy.ymax
  ) {
    didFind = true;
  } else if (
    character === 1 &&
    x >= masterCoords.Med.xmin &&
    x <= masterCoords.Med.xmax &&
    y >= masterCoords.Med.ymin &&
    y <= masterCoords.Med.ymax
  ) {
    didFind = true;
  } else if (
    character === 2 &&
    x >= masterCoords.Hard.xmin &&
    x <= masterCoords.Hard.xmax &&
    y >= masterCoords.Hard.ymin &&
    y <= masterCoords.Hard.ymax
  ) {
    didFind = true;
  }
  console.log("didFind", didFind);
  if (didFind) {
    foundArray = await foundCharacter(character, time);
    console.log("prisma result", foundArray);
    return res.json({ foundArray, found: true });
  }

  return res.json({ found: false });
};

// xmin: 775, xmax: 820, ymin: 1150, ymax: 1200

export { gameStart, submitCoord };
