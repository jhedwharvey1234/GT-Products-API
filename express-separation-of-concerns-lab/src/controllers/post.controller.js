import * as postService from '../services/post.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
   return res
      .status(200)
      .json(new ApiResponse(200, 'Posts retrieved successfully', posts));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error: error.message });
  }
};

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = async (req, res) => {
  try {
    const newPost = await postService.createPost(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, 'Post created successfully', newPost));
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

export const partiallyUpdatePost = async (req, res) => {
  try {
    const updatedPost = await postService.partiallyUpdatePost(req.params.id, req.body);
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error partially updating post', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const success = await postService.deletePost(req.params.id);
    if (!success) return res.status(404).json({ message: 'Post not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};
