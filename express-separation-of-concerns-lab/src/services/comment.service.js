export { getCommentsByUserId } from "./user.comments.service.js";
import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { getPostById } from './post.service.js';

export const getAllcomments = async () => {
    const [comments] = await pool.query('SELECT * FROM comments');
    return comments;
};

export const getcommentById = async (commentsId) => {
    const [rows] = await pool.query('SELECT * FROM comments WHERE commentsId = ?', [commentsId]);
    return rows[0] || null;
};

// ✅ Create comment with authenticated user ID and post validation
export const createcomment = async (commentData, userId) => {
    const { content, postId, title } = commentData;
    
    // Verify the post exists (will throw 404 if not found)
    await getPostById(postId);
    
    try {
        // Use title from request if provided, otherwise empty string (to satisfy NOT NULL constraint)
        const commentTitle = title || '';
        const [result] = await pool.query(
            'INSERT INTO comments (title, content, id, authorId) VALUES (?, ?, ?, ?)',
            [commentTitle, content, postId, userId] // Use title from request or empty string
        );
        const newcommentId = result.insertId;
        return getcommentById(newcommentId);
    } catch (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2") {
            throw new ApiError(400, "Invalid post ID or user ID.");
        }
        throw err;
    }
};
// ✅ Update comment with ownership check
export const updatecomment = async (commentsId, commentData, userId) => {
    const { content, title } = commentData;
    
    // First, get the comment to check for ownership
    const comment = await getcommentById(commentsId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    
    // AUTHORIZATION CHECK - Only the comment author can update
    if (comment.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to edit this comment.");
    }
    
    // If the check passes, proceed with the update
    // Update both title and content if provided
    const updateFields = [];
    const updateValues = [];
    
    if (title !== undefined) {
        updateFields.push('title = ?');
        updateValues.push(title || ''); // Allow empty string for title
    }
    
    if (content !== undefined) {
        updateFields.push('content = ?');
        updateValues.push(content);
    }
    
    if (updateFields.length === 0) {
        return getcommentById(commentsId); // No fields to update
    }
    
    updateValues.push(commentsId);
    const [result] = await pool.query(
        `UPDATE comments SET ${updateFields.join(', ')} WHERE commentsId = ?`,
        updateValues
    );
    if (result.affectedRows === 0) {
        throw new ApiError(404, "Comment not found");
    }
    return getcommentById(commentsId);
};

// ✅ Partially update comment with ownership check
export const partiallyUpdatecomment = async (commentsId, updates, userId) => {
    // First, get the comment to check for ownership
    const comment = await getcommentById(commentsId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    
    // AUTHORIZATION CHECK - Only the comment author can update
    if (comment.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to edit this comment.");
    }
    
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    if (fields.length === 0) return getcommentById(commentsId);
    
    // Prevent updating authorId or postId (id) - these should not be changeable
    const allowedFields = fields.filter(field => field !== 'authorId' && field !== 'id');
    if (allowedFields.length === 0) {
        return getcommentById(commentsId);
    }
    
    const setClause = allowedFields.map(field => `${field} = ?`).join(', ');
    const allowedValues = allowedFields.map(field => updates[field]);
    
    const [result] = await pool.query( 
        `UPDATE comments SET ${setClause} WHERE commentsId = ?`,
        [...allowedValues, commentsId]
    );
    if (result.affectedRows === 0) {
        throw new ApiError(404, "Comment not found");
    }
    return getcommentById(commentsId);
};

// ✅ Delete comment with ownership check
export const deletecomment = async (commentsId, userId) => {
    // First, get the comment to check for ownership
    const comment = await getcommentById(commentsId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    
    // AUTHORIZATION CHECK - Only the comment author can delete
    if (comment.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to delete this comment.");
    }
    
    // If the check passes, proceed with the deletion
    const [result] = await pool.query('DELETE FROM comments WHERE commentsId = ?', [commentsId]);
    return result.affectedRows > 0;
};


// ...existing code...

export const getCommentsByPostId = async (postId) => {
    const [comments] = await pool.query('SELECT * FROM comments WHERE id = ?', [postId]);
    return comments;
};
// ...existing code...