import pool from '../config/db.js';

export const getAllcomments = async () => {
    const [comments] = await pool.query('SELECT * FROM comments');
    return comments;
};
export const getcommentById = async (commentsId) => {
    const [rows] = await pool.query('SELECT * FROM comments WHERE commentsId = ?', [commentsId]);
    return rows[0] || null;
};
export const createcomment = async (commentData) => {
    const {title, content, id} = commentData;
    const [result] = await pool.query(
        'INSERT INTO comments (title, content, id) VALUES (?, ?, ?)',
        [title, content, id]
    );
    const newcommentId = result.insertId;
    return getcommentById(newcommentId);
};
export const updatecomment = async (commentsId, commentData) => {
    const { title, content, id } = commentData;
    const [result] = await pool.query(
        'UPDATE comments SET title = ?, content = ?, id = ? WHERE commentsId = ?',
        [title, content, id, commentsId]
    );
    if (result.affectedRows === 0) return null;
    return getcommentById(commentsId);
    if (result.affectedRows === 0) return null;
    return getcommentById(commentsId);  
};

export const partiallyUpdatecomment = async (commentsId, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    if (fields.length === 0) return getcommentById(commentsId);
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const [result] = await pool.query( 
        `UPDATE comments SET ${setClause} WHERE commentsId = ?`,
        [...values, commentsId]
    );
    if (result.affectedRows === 0) return null;
    return getcommentById(commentsId);
};

export const deletecomment = async (commentsId) => {
    const [result] = await pool.query('DELETE FROM comments WHERE commentsId = ?', [commentsId]);
    return result.affectedRows > 0;
};


// ...existing code...

export const getCommentsByPostId = async (postId) => {
    const [comments] = await pool.query('SELECT * FROM comments WHERE id = ?', [postId]);
    return comments;
};
// ...existing code...