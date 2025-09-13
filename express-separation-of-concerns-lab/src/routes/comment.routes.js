// routes/comment.routes.js

import { Router } from 'express';
import {
    getAllCommentsController,
    getCommentByIdController,
    createCommentController,
    updateCommentController,
    partiallyUpdateCommentController,
    deleteCommentController
} from '../controllers/comment.controller.js';

const router = Router();

// Route definitions
router.get('/', getAllCommentsController);
router.post('/', createCommentController);
router.get('/:commentsId', getCommentByIdController);
router.put('/:commentsId', updateCommentController);
router.patch('/:commentsId', partiallyUpdateCommentController); // Optional: PATCH support
router.delete('/:commentsId', deleteCommentController);

export default router;
