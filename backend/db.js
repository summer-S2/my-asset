const mysql = require("mysql2");

// 커넥션 누수 방지
const pool = mysql.createPool({
  host: "localhost",
  user: "yj",
  password: "password",
  database: "yj_onboarding",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
