
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "MatchMind AI API",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "MatchMind AI backend"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MatchMind AI server running on port ${PORT}`);
});
