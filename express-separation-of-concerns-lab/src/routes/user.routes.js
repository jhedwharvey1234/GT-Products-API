import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validateUser, userController.createUser);
router.get("/:userId/posts", userController.getPostsByUser);
router.get("/:userId/comments", userController.getCommentsByUser);
export default router;
