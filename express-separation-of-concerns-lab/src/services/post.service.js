// src/services/post.service.js
import pool from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

// ✅ Get all posts with author details
export const getAllPosts = async () => {
  const [posts] = await pool.query(`
    SELECT 
      p.id, 
      p.title, 
      p.content, 
      p.authorId,
      u.username AS authorUsername, 
      u.email AS authorEmail,
      p.createdAt
    FROM posts p
    JOIN users u ON p.authorId = u.id
    ORDER BY p.createdAt DESC
  `);
  return posts;
};

// ✅ Get one post with author details
export const getPostById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id, 
      p.title, 
      p.content, 
      p.authorId,
      u.username AS authorUsername, 
      u.email AS authorEmail,
      p.createdAt
    FROM posts p
    JOIN users u ON p.authorId = u.id
    WHERE p.id = ?
    `,
    [id]
  );

  if (!rows[0]) {
    throw new ApiError(404, "Post not found");
  }
  return rows[0];
};

// ✅ Create post with authorId + FK error handling
export const createPost = async (postData) => {
  const { title, content, authorId } = postData;

  try {
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)",
      [title, content, authorId]
    );

    return await getPostById(result.insertId);
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      throw new ApiError(400, "Invalid author ID. User does not exist.");
    }
    throw err;
  }
};

// ✅ Full update (PUT)
export const updatePost = async (id, postData) => {
  const { title, content, authorId } = postData;

  try {
    const [result] = await pool.query(
      "UPDATE posts SET title = ?, content = ?, authorId = ? WHERE id = ?",
      [title, content, authorId, id]
    );

    if (result.affectedRows === 0) {
      throw new ApiError(404, "Post not found");
    }

    return await getPostById(id);
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      throw new ApiError(400, "Invalid author ID. User does not exist.");
    }
    throw err;
  }
};

// ✅ Partial update (PATCH)
export const partiallyUpdatePost = async (id, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    return await getPostById(id);
  }

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  try {
    const [result] = await pool.query(
      `UPDATE posts SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) {
      throw new ApiError(404, "Post not found");
    }

    return await getPostById(id);
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      throw new ApiError(400, "Invalid author ID. User does not exist.");
    }
    throw err;
  }
};

// ✅ Delete post
export const deletePost = async (id) => {
  const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    throw new ApiError(404, "Post not found");
  }
  return true;
};
