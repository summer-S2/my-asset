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

// GET /account-history (accountId 없이 전체 조회)
router.get("/", async (req, res) => {
  const { keyword = "", limit, page, sort = "" } = req.query;

  const isPaging = page !== undefined || limit !== undefined;
  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.max(Number(limit) || 10, 1);
  const offset = (pageNum - 1) * limitNum;

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
      : `ORDER BY transaction_date DESC`;

  try {
    // 총 개수
    const [[{ count }]] = await db.query(
      `
      SELECT COUNT(*) AS count
      FROM account_history ah
      JOIN account a ON ah.account_id = a.id
      WHERE ah.delete_date IS NULL
        AND (ah.transactor LIKE ? OR ah.transaction_date LIKE ?)
      `,
      [`%${keyword}%`, `%${keyword}%`]
    );

    let rows;

    if (isPaging) {
      [rows] = await db.query(
        `
        SELECT 
          ah.id, ah.account_id, ah.transaction_date, ah.transaction_type,
          ah.transactor, ah.memo, ah.amount,
          ah.create_date, ah.update_date,
          a.account_type
        FROM account_history ah
        JOIN account a ON ah.account_id = a.id
        WHERE ah.delete_date IS NULL
          AND (ah.transactor LIKE ? OR ah.transaction_date LIKE ?)
        ${orderByClause}
        LIMIT ? OFFSET ?
        `,
        [`%${keyword}%`, `%${keyword}%`, limitNum, offset]
      );
    } else {
      [rows] = await db.query(
        `
        SELECT 
          ah.id, ah.account_id, ah.transaction_date, ah.transaction_type,
          ah.transactor, ah.memo, ah.amount,
          ah.create_date, ah.update_date,
          a.account_type
        FROM account_history ah
        JOIN account a ON ah.account_id = a.id
        WHERE ah.delete_date IS NULL
          AND (ah.transactor LIKE ? OR ah.transaction_date LIKE ?)
        ${orderByClause}
        `,
        [`%${keyword}%`, `%${keyword}%`]
      );
    }

    res.status(200).json({
      code: 200,
      count,
      httpStatus: "OK",
      message: "success",
      result: {
        totalItems: count,
        totalPages: isPaging ? Math.ceil(count / limitNum) : 1,
        currentPage: isPaging ? pageNum : 1,
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
