
import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import * as commentController from "../controllers/comment.controller.js";
import { validatePost } from "../middlewares/validator.middleware.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();


router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
// Create post must be authenticated
router.post('/', authMiddleware, validatePost, postController.createPost);
router.put("/:id", validatePost, postController.updatePost);
router.patch("/:id", postController.partiallyUpdatePost); // todo: add patch validator later
router.delete("/:id", postController.deletePost);

router.get("/:postId/comments", commentController.getCommentsByPostId);

export default router;
