const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit : 10, // 最大连接数
  host            : '127.0.0.1', // 数据库主机名
  user            : 'root', // 数据库用户
  password        : '12345678', // 数据库密码
  database        : 'budgeting' // 数据库名
});

module.exports = pool;