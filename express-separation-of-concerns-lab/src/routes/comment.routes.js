import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { getCommentsByPostId } from '../services/comment.service.js';

const router = Router();

router.get('/', commentController.getAllcomments);
router.post('/', commentController.createcomment);
router.get('/:id', commentController.getcommentById);
router.put('/:id', commentController.updatecomment);
router.delete('/:id', commentController.deletecomment);
router.patch('/:id', commentController.commentPatch);
router.get('/post/:postId', commentController.getCommentsByPostId);

export default router;