import { getCommentsByUserId } from '../services/comment.service.js';

export const getCommentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await getCommentsByUserId(userId);
    return res.status(200).json({ success: true, data: comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
