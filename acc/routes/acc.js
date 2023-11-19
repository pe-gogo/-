var express = require('express');
var router = express.Router();
var pool = require('../db');
const dayjs = require('dayjs'); // 添加 dayjs，如果没有安装，请运行 npm install dayjs


// 添加记账记录
router.post('/', async (req, res) => {
    const { user_id, category, amount, remark_time, remark, ortype } = req.body;

    try {
      const insertQuery = 'INSERT INTO accounting (user_id, category, amount, remark_time, remark, ortype) VALUES (?, ?, ?, ?, ?,?)';
      const [insertResult] = await pool.query(insertQuery, [user_id, category, amount, remark_time, remark, ortype]);

      res.status(200).json({ id: insertResult.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 删除记账记录
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
      const deleteQuery = 'DELETE FROM accounting WHERE id = ?';
      await pool.query(deleteQuery, [id]);

      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 更新记账记录
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { category, amount, remark_time, remark,ortype } = req.body;

    try {
      const updateQuery = 'UPDATE accounting SET category = ?, amount = ?, remark_time = ?, remark = ? ,ortype = ? WHERE id = ?';
      await pool.query(updateQuery, [category, amount, remark_time, remark, id, ortype]);

      res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 根据时间查询用户收支记录
  router.get('/user/:user_id/date/:date', async (req, res) => {
    const user_id = req.params.user_id;
    const date = req.params.date;

    try {
      const selectQuery = 'SELECT * FROM accounting WHERE user_id = ? AND DATE(remark_time) = ?';
      const [results] = await pool.query(selectQuery, [user_id, date]);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



router.get('/records', async (req, res) => {
  const user_id = req.params.user_id;
  const date = req.params.date;

  try {
    let selectQuery = `
    SELECT accounting.*, users.name AS username 
    FROM accounting 
    JOIN users 
    ON accounting.user_id = users.id
  `;
    const [results] = await pool.query(selectQuery);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  // 根据用户ID查找记录
  router.get('/user/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    try {
      const selectQuery = 'SELECT * FROM accounting WHERE user_id = ?';
      const [results] = await pool.query(selectQuery, [user_id]);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/user/:user_id/summary', async (req, res) => {
    const user_id = req.params.user_id;

    try {
      const selectQuery = `
        SELECT YEAR(remark_time) as year, MONTH(remark_time) as month, SUM(amount) as total_amount
        FROM accounting
        WHERE user_id = ?
        GROUP BY YEAR(remark_time), MONTH(remark_time)
        ORDER BY YEAR(remark_time), MONTH(remark_time)`;
      const [results] = await pool.query(selectQuery, [user_id]);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/user/:user_id/income-expense', async (req, res) => {
    const user_id = req.params.user_id;

    try {
      const selectQuery = `
        SELECT YEAR(remark_time) as year, MONTH(remark_time) as month,
          SUM(CASE WHEN ortype = 1 THEN amount ELSE 0 END) as income,
          SUM(CASE WHEN ortype = 0 THEN amount ELSE 0 END) as expense
        FROM accounting
        WHERE user_id = ?
        GROUP BY YEAR(remark_time), MONTH(remark_time)
        ORDER BY YEAR(remark_time), MONTH(remark_time)`;
      const [results] = await pool.query(selectQuery, [user_id]);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.get('/user/:user_id/category-summary', async (req, res) => {
    const user_id = req.params.user_id;

    try {
      const selectQuery = `
        SELECT category, ortype, SUM(amount) as total_amount
        FROM accounting
        WHERE user_id = ?
        GROUP BY category, ortype`;
      const [results] = await pool.query(selectQuery, [user_id]);

      // 根据 ortype 分类
      const incomeData = results.filter(item => item.ortype === 1);
      const expenseData = results.filter(item => item.ortype === 0);

      // 计算总收入和总支出
      const totalIncome = incomeData.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
      const totalExpense = expenseData.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);

      // 计算各类别的百分比
      const incomeSummary = incomeData.map(item => {
        const percentage = (item.total_amount / totalIncome);
        return {
          name: item.category,
          value: parseFloat((percentage * 100).toFixed(2)),
        };
      });

      const expenseSummary = expenseData.map(item => {
        const percentage = (item.total_amount / totalExpense);
        return {
          name: item.category,
          value: parseFloat((percentage * 100).toFixed(2)),
        };
      });

      res.status(200).json({
        incomeSummary,
        expenseSummary
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


router.get('/user/:user_id/daily-report', async (req, res) => {
  const currentDate = new Date();

// 获取中国时区的时间（UTC+8）
  const chinaTime = new Date(currentDate.getTime() + 8 * 60 * 60 * 1000);

  // 格式化日期为 "2020-03-01" 格式
  const formattedDate = chinaTime.toISOString().slice(0, 10);

  const user_id = req.params.user_id;
  const today = formattedDate // 今天的开始时间

  console.log(today)
  try {
    const selectQuery = `
      SELECT DATE(record_time) as date, ortype, SUM(amount) as total_amount
      FROM accounting
      WHERE user_id = ? AND record_time <= ?
      GROUP BY DATE(record_time), ortype`;
    const [results] = await pool.query(selectQuery, [user_id, today]);

    // 根据 ortype 分类
    const incomeData = results.filter(item => item.ortype === 1);
    const expenseData = results.filter(item => item.ortype === 0);

    // 合并收入和支出数据
    const dailyData = incomeData.concat(expenseData);

    // 用 Map 存储每天的收支差额
    const dailyReportMap = new Map();

    dailyData.forEach(item => {
      const date = item.date;
      const amount = parseFloat(item.total_amount);
      const currentAmount = dailyReportMap.get(date) || 0;

      // 如果是支出，则用负数表示
      const amountToAdd = item.ortype === 0 ? -amount : amount;
      dailyReportMap.set(date, currentAmount + amountToAdd);
    });

    // 转换为数组
    const dailyReport = Array.from(dailyReportMap.entries()).map(([date, balance]) => {
      return { date, balance };
    });

    res.status(200).json(dailyReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  // 根据时间查询用户记录
  router.get('/user/:user_id/date/:date', async (req, res) => {
    const user_id = req.params.user_id;
    const date = req.params.date;

    try {
      const selectQuery = 'SELECT * FROM accounting WHERE user_id = ? AND DATE(record_time) = ?';
      const [results] = await pool.query(selectQuery, [user_id, date]);

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
