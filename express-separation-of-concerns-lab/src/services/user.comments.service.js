import pool from '../config/db.js';

export const getCommentsByUserId = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM comments WHERE authorId = ?', [userId]);
  return rows;
};
