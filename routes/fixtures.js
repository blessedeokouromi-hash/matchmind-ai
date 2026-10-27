
import express from "express";
import { getFixtures } from "../services/sportsApi.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const date = req.query.date;

  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return res.status(400).json({
      error: "Provide a date in YYYY-MM-DD format."
    });
  }

  try {
    const fixtures = await getFixtures(date);

    res.set("Cache-Control", "public, max-age=60");

    return res.json({
      date,
      count: fixtures.length,
      fixtures
    });
  } catch (error) {
    console.error("Fixture request failed:", error.message);

    return res.status(502).json({
      error: "Unable to retrieve football fixtures right now."
    });
  }
});

export default router;
