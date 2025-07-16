const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /account-history/:accountId?keyword=카카오&limit=10&page=1
router.get("/:accountId", async (req, res) => {
  const { accountId } = req.params;
  const { keyword = "", limit = 10, page = 1, sort = "" } = req.query;

  const offset = (page - 1) * limit;

  const [sortKey, sortOrder] = sort.split(".");
  const validSortKeys = [
    "transaction_date",
    "transactor",
    "amount",
    "transaction_type",
    "memo",
    "create_date",
    "update_date",
  ];
  const validOrder = ["asc", "desc"];

  const orderByClause =
    sortKey && validSortKeys.includes(sortKey) && validOrder.includes(sortOrder)
      ? `ORDER BY ${sortKey} ${sortOrder.toUpperCase()}`
      : `ORDER BY transaction_date DESC`; // 기본 정렬

  try {
    // 총 개수 조회
    const [[{ count }]] = await db.query(
      `
      SELECT COUNT(*) AS count
      FROM account_history
      WHERE account_id = ?
        AND delete_date IS NULL
        AND (transactor LIKE ? OR transaction_date LIKE ?)
      `,
      [accountId, `%${keyword}%`, `%${keyword}%`]
    );

    // 리스트 조회
    const [rows] = await db.query(
      `
      SELECT 
        id,
        account_id,
        transaction_date,
        transaction_type,
        transactor,
        memo,
        amount,
        create_date,
        update_date
      FROM account_history
      WHERE account_id = ?
        AND delete_date IS NULL
        AND (transactor LIKE ? OR transaction_date LIKE ?)
      ${orderByClause}
      LIMIT ? OFFSET ?
      `,
      [accountId, `%${keyword}%`, `%${keyword}%`, Number(limit), Number(offset)]
    );

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
    });
  }
});

module.exports = router;
