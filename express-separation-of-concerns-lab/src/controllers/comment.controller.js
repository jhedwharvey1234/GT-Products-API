import {
    getAllcomments,
    getcommentById,
    createcomment,
    updatecomment,
    partiallyUpdatecomment,
    deletecomment,
     getCommentsByPostId as getCommentsByPostIdService
} from '../services/comment.service.js'; // Adjust the path based on your structure

// Get all comments
export const getAllCommentsController = async (req, res) => {
    try {
        const comments = await getAllcomments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments', error });
    }
};

// Get a comment by ID
export const getCommentByIdController = async (req, res) => {
    try {
        const { commentsId } = req.params;
        const comment = await getcommentById(commentsId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comment', error });
    }
};

// Create a new comment
export const createCommentController = async (req, res) => {
    try {
        const commentData = req.body;
        const newComment = await createcomment(commentData);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
};

// Update a comment fully
export const updateCommentController = async (req, res) => {
    try {
        const { commentsId } = req.params;
        const commentData = req.body;
        const updatedComment = await updatecomment(commentsId, commentData);
        if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update comment', error });
    }
};

// Partially update a comment
export const partiallyUpdateCommentController = async (req, res) => {
    try {
        const { commentsId } = req.params;
        const updates = req.body;
        const updatedComment = await partiallyUpdatecomment(commentsId, updates);
        if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to partially update comment', error });
    }
};

// Delete a comment
export const deleteCommentController = async (req, res) => {
    try {
        const { commentsId } = req.params;
        const deleted = await deletecomment(commentsId);
        if (!deleted) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error });
    }
};
export const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await getCommentsByPostIdService(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments for the post', error });
    }
};
