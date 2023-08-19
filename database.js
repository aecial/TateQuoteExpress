import mysql from "mysql2";
import "dotenv/config";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME,
  })
  .promise();

export async function getQuotes() {
  const [rows] = await pool.query("SELECT * FROM quotes");
  return rows;
}
export async function getRandomQuote() {
  const [rows] = await pool.query(
    "SELECT id,text,author FROM quotes ORDER BY RAND() LIMIT 1"
  );
  return rows;
}
export async function getQuote(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM 
  quotes
  WHERE id = ?`,
    [id]
  );
  return rows[0];
}
export async function createQuote(text, author) {
  const [result] = await pool.query(
    `
  INSERT INTO 
  quotes
  (text, author)
  VALUES
  (?, ?)`,
    [text, author]
  );
  return { id: result.insertId, text, author };
}
