const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /accounts?searchKey=신한&limit=10&page=1
router.get("/", async (req, res) => {
  const { searchKey = "", limit = 10, page = 1 } = req.query;

  const offset = (page - 1) * limit;

  try {
    // 총 개수
    const [[{ count }]] = await db.query(
      `
      SELECT COUNT(*) as count
      FROM account a
      JOIN bank b ON a.bank_id = b.id
      WHERE b.name LIKE ? OR a.account_num LIKE ?
      `,
      [`%${searchKey}%`, `%${searchKey}%`]
    );

    // 페이지 데이터
    const [rows] = await db.query(
      `
      SELECT 
        a.id, a.account_num, a.balance, a.issue_date,
        b.name AS bank_name,
        u.name AS user_name
      FROM account a
      JOIN bank b ON a.bank_id = b.id
      JOIN user u ON a.user_id = u.id
      WHERE b.name LIKE ? OR a.account_num LIKE ?
      ORDER BY a.id DESC
      LIMIT ? OFFSET ?
      `,
      [`%${searchKey}%`, `%${searchKey}%`, Number(limit), Number(offset)]
    );

    // 응답 포맷 맞춰서 리턴
    res.status(200).json({
      code: 200,
      count,
      httpStatus: "OK",
      message: "success",
      result: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        list: rows,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      code: 500,
      count: 0,
      httpStatus: "INTERNAL_SERVER_ERROR",
      message: err.message,
      result: {
        totalItems: 0,
        totalPages: 0,
        currentPage: Number(page),
        list: [],
      },
    });
  }
});

module.exports = router;
