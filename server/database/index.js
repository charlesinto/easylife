import mysql from 'mysql2';
import "dotenv/config";

// const {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER} = process.env;
// console.log(DB_PASSWORD, DB_USER, DB_DATABASE, DB_HOST)
const pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      database: DB_DATABASE,
      password: DB_PASSWORD,
      waitForConnections: true
})

export default pool;