import {
    getAllcomments,
    getcommentById,
    createcomment,
    updatecomment,
    partiallyUpdatecomment,
    deletecomment,
     getCommentsByPostId as getCommentsByPostIdService
} from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from 'express-async-handler';

export const getAllCommentsController = asyncHandler(async (req, res) => {
    const comments = await getAllcomments();
    res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});

export const getCommentByIdController = asyncHandler(async (req, res) => {
    const { commentsId } = req.params;
    const comment = await getcommentById(commentsId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    res.status(200).json(new ApiResponse(200, comment, "Comment retrieved successfully"));
});

// ✅ Create comment with authenticated user
export const createCommentController = asyncHandler(async (req, res) => {
    // The authorId now comes from the authenticated user attached by the middleware
    const userId = req.user.id;
    const commentData = req.body;
    
    const newComment = await createcomment(commentData, userId); // Pass userId separately
    res.status(201).json(new ApiResponse(201, newComment, "Comment created successfully"));
});

// ✅ Update comment with ownership check
export const updateCommentController = asyncHandler(async (req, res) => {
    const { commentsId } = req.params;
    const commentData = req.body;
    const userId = req.user.id; // Get the user ID from the middleware
    
    const updatedComment = await updatecomment(commentsId, commentData, userId);
    res.status(200).json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

// ✅ Partially update comment with ownership check
export const partiallyUpdateCommentController = asyncHandler(async (req, res) => {
    const { commentsId } = req.params;
    const updates = req.body;
    const userId = req.user.id; // Get the user ID from the middleware
    
    const updatedComment = await partiallyUpdatecomment(commentsId, updates, userId);
    res.status(200).json(new ApiResponse(200, updatedComment, "Comment partially updated successfully"));
});

// ✅ Delete comment with ownership check
export const deleteCommentController = asyncHandler(async (req, res) => {
    const { commentsId } = req.params;
    const userId = req.user.id; // Get the user ID from the middleware
    
    await deletecomment(commentsId, userId);
    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
});
export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const comments = await getCommentsByPostIdService(postId);
    res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});
