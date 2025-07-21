const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const upload = multer();

// 계좌 리스트 조회
// GET /account?keyword=신한&limit=10&page=1
router.get("/", async (req, res) => {
  // 파라미터 추출
  const { keyword = "", limit, page, sort = "" } = req.query;

  // 페이징 처리 할건지 여부. page랑 limit을 안보내면 전체 데이터 조회
  const isPaging = page !== undefined || limit !== undefined;

  const pageNum = Math.max(Number(page) || 1, 1); // 페이지
  const limitNum = Math.max(Number(limit) || 10, 1); // 페이지 사이즈
  const offset = (pageNum - 1) * limitNum; // 조회 시작 위치

  const [sortKey, sortOrder] = sort.split("."); // 정렬 키와 순서 ex) balance.desc → balance, desc

  // 정렬이 가능한 키들
  const validSortKeys = [
    "bank_name",
    "account_num",
    "balance",
    "create_date",
    "account_type",
  ];

  // 정렬 순서
  const validOrder = ["asc", "desc"];

  const orderByClause =
    sortKey && validSortKeys.includes(sortKey) && validOrder.includes(sortOrder)
      ? `ORDER BY ${sortKey} ${sortOrder.toUpperCase()}`
      : `ORDER BY a.id DESC`;

  try {
    let count = 0; // 총 데이터 수
    let rows; // 결과값

    // 페이징 O → count + LIMIT + OFFSET
    if (isPaging) {
      const [[{ count: total }]] = await db.query(
        `
        SELECT COUNT(*) as count
        FROM account a
        JOIN bank b ON a.bank_id = b.id
        WHERE a.delete_date IS NULL
        AND (b.name LIKE ? OR a.account_num LIKE ?)
        `,
        [`%${keyword}%`, `%${keyword}%`]
      );
      count = total;

      [rows] = await db.query(
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
        [`%${keyword}%`, `%${keyword}%`, limitNum, offset]
      );
    }
    // 페이징 X → 전체 데이터 조회
    else {
      [rows] = await db.query(
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
        `,
        [`%${keyword}%`, `%${keyword}%`]
      );
      count = rows.length;
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

// 계좌 상세 조회
// GET /account/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        a.id, a.account_num, a.balance, a.create_date, a.account_type, a.bank_id,
        b.name AS bank_name,
        u.name AS user_name
      FROM account a
      JOIN bank b ON a.bank_id = b.id
      JOIN user u ON a.user_id = u.id
      WHERE a.id = ? AND a.delete_date IS NULL
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        httpStatus: "NOT_FOUND",
        message: "계좌를 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      code: 200,
      httpStatus: "OK",
      message: "success",
      result: rows[0],
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

// 계좌 등록
// POST /account
router.post("/", upload.none(), async (req, res) => {
  const { account_num, balance = 0, account_type, bank_id, user_id } = req.body;

  // 필수값 확인 - 계좌번호, 계좌타입, 은행 id, 사용자 id
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
    //  해당 계좌번호가 존재하는지 확인 (삭제 여부와 상관없이)
    const [[existing]] = await db.query(
      `SELECT id, delete_date FROM account WHERE account_num = ?`,
      [account_num]
    );

    //  존재 + 삭제 안됨 → 중복 에러
    if (existing && existing.delete_date === null) {
      return res.status(409).json({
        code: 409,
        httpStatus: "CONFLICT",
        message: "이미 존재하는 계좌번호입니다.",
      });
    }

    //  존재 + 삭제됨 → 사용 불가
    if (existing && existing.delete_date !== null) {
      return res.status(400).json({
        code: 400,
        httpStatus: "BAD_REQUEST",
        message: "삭제된 계좌번호입니다. 사용할 수 없습니다.",
      });
    }
    // // 계좌번호 중복 여부 확인
    // const [[existing]] = await db.query(
    //   `SELECT id FROM account WHERE account_num = ? AND delete_date IS NULL`,
    //   [account_num]
    // );

    // if (existing) {
    //   return res.status(409).json({
    //     code: 409,
    //     httpStatus: "CONFLICT",
    //     message: "이미 존재하는 계좌번호입니다.",
    //   });
    // }

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

// 계좌 수정
// PATCH /account
router.patch("/", upload.none(), async (req, res) => {
  // 수정 가능 항목 - 은행 id, 계좌 타입
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

// 계좌 삭제
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

    //  계좌 soft delete
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

    //  연관 거래 이력도 soft delete
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

module.exports = router;
