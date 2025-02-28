import { createGame, foundCharacter } from "../models/dbQueries.js";

const masterCoordsLarge = {
  Easy: { xmin: 775, xmax: 820, ymin: 1150, ymax: 1200 },
  Med: { xmin: 2700, xmax: 2760, ymin: 1725, ymax: 1800 },
  Hard: { xmin: 2330, xmax: 2390, ymin: 770, ymax: 860 },
};

const masterCoordsSmall = {
  Easy: { xmin: 375, xmax: 425, ymin: 570, ymax: 610 },
  Med: { xmin: 1350, xmax: 1380, ymin: 860, ymax: 905 },
  Hard: { xmin: 1165, xmax: 1195, ymin: 390, ymax: 430 },
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
  const { x, y, character, time, smaller } = req.body;
  console.log("submitCoord", x, y, character, time, smaller);
  let didFind = false;
  let foundArray;
  if (smaller) {
    if (
      character === 0 &&
      x >= masterCoordsSmall.Easy.xmin &&
      x <= masterCoordsSmall.Easy.xmax &&
      y >= masterCoordsSmall.Easy.ymin &&
      y <= masterCoordsSmall.Easy.ymax
    ) {
      didFind = true;
    } else if (
      character === 1 &&
      x >= masterCoordsSmall.Med.xmin &&
      x <= masterCoordsSmall.Med.xmax &&
      y >= masterCoordsSmall.Med.ymin &&
      y <= masterCoordsSmall.Med.ymax
    ) {
      didFind = true;
    } else if (
      character === 2 &&
      x >= masterCoordsSmall.Hard.xmin &&
      x <= masterCoordsSmall.Hard.xmax &&
      y >= masterCoordsSmall.Hard.ymin &&
      y <= masterCoordsSmall.Hard.ymax
    ) {
      didFind = true;
    }
  } else {
    if (
      character === 0 &&
      x >= masterCoordsLarge.Easy.xmin &&
      x <= masterCoordsLarge.Easy.xmax &&
      y >= masterCoordsLarge.Easy.ymin &&
      y <= masterCoordsLarge.Easy.ymax
    ) {
      didFind = true;
    } else if (
      character === 1 &&
      x >= masterCoordsLarge.Med.xmin &&
      x <= masterCoordsLarge.Med.xmax &&
      y >= masterCoordsLarge.Med.ymin &&
      y <= masterCoordsLarge.Med.ymax
    ) {
      didFind = true;
    } else if (
      character === 2 &&
      x >= masterCoordsLarge.Hard.xmin &&
      x <= masterCoordsLarge.Hard.xmax &&
      y >= masterCoordsLarge.Hard.ymin &&
      y <= masterCoordsLarge.Hard.ymax
    ) {
      didFind = true;
    }
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
