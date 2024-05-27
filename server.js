const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// การตั้งค่าการเชื่อมต่อกับฐานข้อมูล MSSQL
const dbConfig = {
    user: 'SA',
    password: 'MyStrongPass123',
    server: 'localhost',
    database: 'store',
    options: {
        encrypt: true, // ใช้เมื่อเชื่อมต่อกับ Azure SQL
        trustServerCertificate: true // ใช้เมื่อเชื่อมต่อกับเซิร์ฟเวอร์ที่ไม่ปลอดภัย
    }
};

// สร้าง API endpoint สำหรับดึงข้อมูลสินค้า
app.get('/catalogue', async (req, res) => {
    try {
        // เชื่อมต่อกับฐานข้อมูล
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM catalogue'); // แก้ไขคำสั่ง SQL ตามโครงสร้างของคุณ

        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        // เชื่อมต่อกับฐานข้อมูล
        let pool = await sql.connect(dbConfig);

        const id = req.params.id
        let result = await pool.request().input('input_parameter', sql.Int, id).query('SELECT * FROM catalogue WHERE id = @input_parameter'); // แก้ไขคำสั่ง SQL ตามโครงสร้างของคุณ

        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});