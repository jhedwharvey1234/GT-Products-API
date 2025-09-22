

import { Router } from 'express';
import {
    getAllCommentsController,
    getCommentByIdController,
    createCommentController,
    updateCommentController,
    partiallyUpdateCommentController,
    deleteCommentController
} from '../controllers/comment.controller.js';
import { validateComment } from '../middlewares/validator.middleware.js';

const router = Router();


router.get('/', getAllCommentsController);
router.post('/', validateComment, createCommentController);
router.get('/:commentsId', getCommentByIdController);
router.put('/:commentsId', updateCommentController);
router.patch('/:commentsId', partiallyUpdateCommentController); // Optional: PATCH support
router.delete('/:commentsId', deleteCommentController);

export default router;
