var express = require('express');
var router = express.Router();
var pool = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// 用户相关接口
// 创建用户
router.post('/', async (req, res) => {
  const user = req.body;
  const query = 'INSERT INTO users SET ?';
  try {
    const [results] = await pool.query(query, user);
    res.status(200).json({ id: results.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 获取所有用户
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM users';

  try {
    const [results] = await pool.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 获取单个用户
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  try {
    const [results] = await pool.query(query, [userId]);
    res.status(200).json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 更新用户
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const query = 'UPDATE users SET ? WHERE id = ?';

  try {
    await pool.query(query, [updatedUser, userId]);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';

  try {
    await pool.query(query, [userId]);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// 注册接口
router.post('/register', async (req, res) => {
  const { name, username, password, phone } = req.body;

  try {
    // 检查用户名是否已存在
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    const [checkResult] = await pool.query(checkQuery, [username]);

    if (checkResult.length > 0) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    // 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 将用户信息插入数据库
    const insertQuery = 'INSERT INTO users (name, username, password, phone) VALUES (?, ?, ?, ?)';
    const [insertResult] = await pool.query(insertQuery, [name, username, hashedPassword, phone]);

    res.status(200).json({ id: insertResult.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 查找用户
    const query = 'SELECT * FROM users WHERE username = ?';
    const [results] = await pool.query(query, [username]);

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = results[0];

    // 验证密码
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // 登录成功
      res.status(200).json({ id: user.id,...user });
    } else {
      // 密码错误
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
