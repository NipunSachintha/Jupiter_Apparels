const mysql = require('mysql2');
const dotenv = require('dotenv');

// dotenv config
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,        // Replace with your DB host
  user: process.env.DB_USER,        // Replace with your MySQL username
  password: process.env.DB_PASS,// Replace with your MySQL password
  database: process.env.DB_NAME // Replace with your database name
});

module.exports = db;
