import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import {
  submitCoord,
  gameStart,
  populateLeaderboard,
} from "./controllers/gameController.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route Example
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/api/game/:id", gameStart);

app.post("/api/game/coord/:id", submitCoord);

app.get("/api/leaderboard", populateLeaderboard);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
