const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./config/db');

// here import the routes
//
//
const authRoutes = require('./routes/authRoute')


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON data

app.use((req,res,next) =>{
    req.db = db;
    next();
});


// here use the routes
app.use('/',authRoutes);


const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
/*
app.post('/login', (req, res) => {
    const{username, password} = req.body;
    const sql = 'SELECT * FROM user WHERE User_name = ?';

    db.query(sql, [username], async(err, result) => {
        if (err) return res.status(500).json({ error: "Database Error" });
        if (result.length === 0) return res.status(401).json({ error: "Invalid Username or Password" });

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) return res.status(401).json({ error: "Invalid Username or Password" });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.User_ID, role: user.Auth_Level, username: user.User_Name }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token, role: user.Auth_Level, username: user.User_Name });

    });
});
*/
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ error: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid Token" });
    }
};


app.get("/home", authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}`, role: req.user.role });
});

/*
app.get('/', (req, res) => {
    res.json("Hello!! This is the backend")
});
*/

app.get('/employee', (req, res) => {
    const sql = 'SELECT * FROM employee';
    db.query(sql, (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    });
});

app.get('/custom-fields',(req,res)=>{
    const q = 'select * from custom_field';
    db.query(q,(err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post('/custom-fields',(req,res)=>{
    const q = "insert into custom_field (Field_ID,Field_Name) values (?,?)";
    const values = [req.body.id,req.body.Name];

    db.query(q,values, (err,data)=>{
        if (err) return res.json(err);
        return res.json("Custom field added");
    })
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


 