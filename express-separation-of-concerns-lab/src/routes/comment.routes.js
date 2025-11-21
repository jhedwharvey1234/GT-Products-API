
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
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 */
router.get('/', getAllCommentsController);

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - postId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Optional comment title
 *                 example: test 2
 *               content:
 *                 type: string
 *                 example: Great post!
 *               postId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Validation error or post not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post('/', authMiddleware, validateComment, createCommentController);

/**
 * @swagger
 * /api/v1/comments/{commentsId}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentsId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.get('/:commentsId', getCommentByIdController);

/**
 * @swagger
 * /api/v1/comments/{commentsId}:
 *   put:
 *     summary: Update a comment (full update)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentsId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Optional comment title
 *                 example: Updated title
 *               content:
 *                 type: string
 *                 example: Updated comment content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the comment owner
 *       404:
 *         description: Comment not found
 */
router.put('/:commentsId', authMiddleware, updateCommentController);

/**
 * @swagger
 * /api/v1/comments/{commentsId}:
 *   patch:
 *     summary: Partially update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentsId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Partially updated content
 *     responses:
 *       200:
 *         description: Comment partially updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the comment owner
 *       404:
 *         description: Comment not found
 */
router.patch('/:commentsId', authMiddleware, partiallyUpdateCommentController);

/**
 * @swagger
 * /api/v1/comments/{commentsId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentsId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the comment owner
 *       404:
 *         description: Comment not found
 */
router.delete('/:commentsId', authMiddleware, deleteCommentController);

export default router;
