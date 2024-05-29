const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 8080;

app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// การตั้งค่าการเชื่อมต่อกับฐานข้อมูล MSSQL
const dbConfig = {
    user: 'SA',
    password: 'MyStrongPass123',
    server: 'localhost',
    database: 'store',
    options: {
        encrypt: false, // ใช้เมื่อเชื่อมต่อกับ Azure SQL
        trustServerCertificate: false // ใช้เมื่อเชื่อมต่อกับเซิร์ฟเวอร์ที่ไม่ปลอดภัย
    }
};

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async function(username, password, done) {
    // authenticate user
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM users WHERE username = @username');

        const user = result.recordset[0];
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        // const hashed = bcrypt.hashSync(password, 8)
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {  
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (err) {
        return done(err);
    }

  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE id = @id');

        const user = result.recordset[0];
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.post('/login', passport.authenticate('local'),(req, res) => {
    const { username } = req.body
    
    console.log("🚀 ~ app.post ~ username:", username)
    // var token = jwt.sign({ username: username }, 'secrect');
    res.send({message: 'Logged in successfully', login_username:username});
});

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

const uploadPath =  './public/image';
// image uploading
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
    const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
      const fileName = `${timestamp}_${random}.png`; // Append ".png"
      cb(null, fileName);
    }
  });
  const upload = multer({ storage: storage });

app.post('/addProduct', upload.single('image'),async (req, res) => {

    const { name, price, description } = req.body
    const image = req.file ? req.file.path : null;
    const imagePath = image.replace('public','')
    
    console.log("🚀 ~ app.post ~ imagePath:", imagePath)
    console.log("🚀 ~ app.post ~ image:", image)
    


    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('name', sql.VarChar(50), name)
            .input('image', sql.VarChar(50), imagePath)
            .input('price', sql.Float, price)
            .input('description', sql.VarChar(50), description).query(`
            INSERT INTO catalogue (name, image, price, description)
            VALUES (@name,@image,@price,@description)
        `);
        res.status(201).send({ message: 'บันทึกสินค้าสำเร็จ' });
    } catch (err) {
        console.error('Error inserting product:', err);
        res.status(500).send({ error: 'เกิดข้อผิดพลาดในการบันทึกสินค้า' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});