import * as postService from '../services/post.service.js';

export const getAllPosts = (req, res) => {
    const posts = postService.getAllPosts();
    res.json(posts);
};

export const getPostById = (req, res) => {
    const postId = parseInt (req.params.id, 10);
    const post = postService.getPostById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
};

export const createPost = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }  
    const newPost = postService.createPost({ title, content });
    res.status(201).json(newPost);
};
export const updatePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const updatedPost = postService.updatePost(postId, { title, content });
    if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(updatedPost);
};

export const deletePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const success = postService.deletePost(postId);
    if (!success) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(204).send();
};

export const postPatch = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const patchedPost = postService.patchPost(postId, { title, content });
    if (!patchedPost) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(patchedPost);
};