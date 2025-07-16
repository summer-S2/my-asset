const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const upload = multer();

// GET /account?keyword=신한&limit=10&page=1
router.get("/", async (req, res) => {
  const { keyword = "", limit = 10, page = 1, sort = "" } = req.query;

  const offset = (page - 1) * limit;

  const [sortKey, sortOrder] = sort.split(".");
  const validSortKeys = [
    "bank_name",
    "account_num",
    "balance",
    "create_date",
    "account_type",
  ];
  const validOrder = ["asc", "desc"];

  const orderByClause =
    sortKey && validSortKeys.includes(sortKey) && validOrder.includes(sortOrder)
      ? `ORDER BY ${sortKey} ${sortOrder.toUpperCase()}`
      : `ORDER BY a.id DESC`; // 기본 정렬

  try {
    // 총 개수
    const [[{ count }]] = await db.query(
      `
  SELECT COUNT(*) as count
  FROM account a
  JOIN bank b ON a.bank_id = b.id
  WHERE a.delete_date IS NULL
  AND (b.name LIKE ? OR a.account_num LIKE ?)
  `,
      [`%${keyword}%`, `%${keyword}%`]
    );

    // 페이지 데이터
    const [rows] = await db.query(
      `
  SELECT 
    a.id, a.account_num, a.balance, a.create_date,a.account_type, a.bank_id,
    b.name AS bank_name,
    u.name AS user_name
  FROM account a
  JOIN bank b ON a.bank_id = b.id
  JOIN user u ON a.user_id = u.id
  WHERE a.delete_date IS NULL
  AND (b.name LIKE ? OR a.account_num LIKE ?)
  ${orderByClause}
  LIMIT ? OFFSET ?
  `,
      [`%${keyword}%`, `%${keyword}%`, Number(limit), Number(offset)]
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
    });
  }
});

// POST /account
router.post("/", upload.none(), async (req, res) => {
  const { account_num, balance = 0, account_type, bank_id, user_id } = req.body;

  // 필수값 확인
  if (!account_num || !account_type || !bank_id || !user_id) {
    return res.status(400).json({
      code: 400,
      httpStatus: "BAD_REQUEST",
      message: "필수 항목이 누락되었습니다.",
    });
  }

  //  account_num 숫자 13자리 검사
  const isValidAccountNum = /^\d{13}$/.test(account_num);
  if (!isValidAccountNum) {
    return res.status(400).json({
      code: 400,
      httpStatus: "BAD_REQUEST",
      message: "account_num은 숫자 13자리여야 합니다.",
    });
  }

  try {
    await db.query(
      `
      INSERT INTO account 
      (account_num, balance, account_type, bank_id, user_id, create_date, update_date)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `,
      [account_num, balance, account_type, bank_id, user_id]
    );

    res.status(200).json({
      code: 200,
      httpStatus: "CREATED",
      message: "계좌가 성공적으로 생성되었습니다.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      code: 500,
      httpStatus: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
});

// DELETE /account/:id (소프트 삭제 + 연관 거래 내역도 soft delete)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      code: 400,
      httpStatus: "BAD_REQUEST",
      message: "계좌 ID가 필요합니다.",
    });
  }

  const conn = await db.getConnection(); // 트랜잭션용 연결 가져오기
  try {
    await conn.beginTransaction();

    // 1. 계좌 soft delete
    const [accountResult] = await conn.query(
      `UPDATE account SET delete_date = NOW() WHERE id = ? AND delete_date IS NULL`,
      [id]
    );

    if (accountResult.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({
        code: 404,
        httpStatus: "NOT_FOUND",
        message: "이미 삭제되었거나 존재하지 않는 계좌입니다.",
      });
    }

    // 2. 연관 거래 이력도 soft delete
    await conn.query(
      `UPDATE account_history SET delete_date = NOW() WHERE account_id = ? AND delete_date IS NULL`,
      [id]
    );

    await conn.commit();

    res.status(200).json({
      code: 200,
      httpStatus: "OK",
      message: "계좌 및 관련 거래내역이 성공적으로 삭제되었습니다.",
    });
  } catch (err) {
    await conn.rollback();
    console.error("Error:", err);
    res.status(500).json({
      code: 500,
      httpStatus: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  } finally {
    conn.release(); // 연결 반납
  }
});

// PATCH /account
router.patch("/", upload.none(), async (req, res) => {
  const { bank_id, account_type, id } = req.body;

  if (!id || !bank_id || !account_type) {
    return res.status(400).json({
      code: 400,
      httpStatus: "BAD_REQUEST",
      message: "필수 항목이 누락되었습니다.",
    });
  }

  try {
    const [result] = await db.query(
      `
      UPDATE account
      SET bank_id = ?, account_type = ?, update_date = NOW()
      WHERE id = ? AND delete_date IS NULL
      `,
      [bank_id, account_type, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        httpStatus: "NOT_FOUND",
        message: "수정할 계좌가 없거나 이미 삭제된 계좌입니다.",
      });
    }

    res.status(200).json({
      code: 200,
      httpStatus: "OK",
      message: "계좌가 성공적으로 수정되었습니다.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      code: 500,
      httpStatus: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
});

// DELETE /accounts/:id (소프트 삭제)
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({
//       code: 400,
//       httpStatus: "BAD_REQUEST",
//       message: "계좌 ID가 필요합니다.",
//     });
//   }

//   try {
//     const [result] = await db.query(
//       `UPDATE account SET delete_date = NOW() WHERE id = ? AND delete_date IS NULL`,
//       [id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         code: 404,
//         httpStatus: "NOT_FOUND",
//         message: "이미 삭제되었거나 존재하지 않는 계좌입니다.",
//       });
//     }

//     // 계좌와 연결된 거래 내역도 soft delete
//     await db.query(
//       `UPDATE account_history SET delete_date = NOW() WHERE account_id = ? AND delete_date IS NULL`,
//       [id]
//     );

//     res.status(200).json({
//       code: 200,
//       httpStatus: "OK",
//       message: "계좌가 성공적으로 삭제(비표시)되었습니다.",
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({
//       code: 500,
//       httpStatus: "INTERNAL_SERVER_ERROR",
//       message: err.message,
//     });
//   }
// });

module.exports = router;
