import * as commentService from '../services/comment.service.js';

export const getAllcomments = (req, res) => {
    const comments = commentService.getAllcomments();
    res.json(comments);
};

export const getcommentById = (req, res) => {
    const commentId = parseInt (req.params.id, 10);
    const comment = commentService.getcommentById(commentId);
    if (!comment) {
        return res.status(404).json({ message: 'comment not found.' });
    }
    res.json(comment);
};

export const createcomment = (req, res) => {
    const { text, postId } = req.body;
    if (!text || !postId) {
        return res.status(400).json({ message: 'Text and postId are required.' });
    }  
    const newcomment = commentService.createcomment({ text, postId });
    res.status(201).json(newcomment);
};
export const updatecomment = (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const { text, postId } = req.body;
    const updatedcomment = commentService.updatecomment(commentId, { text, postId });
    if (!updatedcomment) {
        return res.status(404).json({ message: 'comment not found.' });
    }
    res.json(updatedcomment);
};
export const deletecomment = (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const success = commentService.deletecomment(commentId);
    if (!success) {
        return res.status(404).json({ message: 'comment not found.' });
    }
    res.status(204).send();
};
export const commentPatch = (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const { text, postId } = req.body;
    const patchedcomment = commentService.patchcomment(commentId, { text, postId });
    if (!patchedcomment) {
        return res.status(404).json({ message: 'comment not found.' });
    }
    res.json(patchedcomment);
};
export const getCommentsByPostId = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = commentService.getCommentsByPostId(postId);
    res.json(comments);
};