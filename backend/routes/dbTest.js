const express = require("express");
const router = express.Router();
const db = require("../db"); // db.js 경로에 맞게 수정

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result;");
    res.json({ success: true, result: rows[0].result });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
