import express from 'express';
import mysql from 'mysql2';
const app = express();
app.use(express.json()); // helps clients to post data

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nipun',
    password: '1234',
    database: 'myhrms'
});

app.get('/', (req, res) => {
    res.json("Hello!! This is the backend")
});

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


 