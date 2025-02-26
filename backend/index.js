const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route Example
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/api/game/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { gameId } = req.body;
  console.log(gameId, "test", req.body);
  res.json({ gId: gameId, id: id, tester: "tester" });
});

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
