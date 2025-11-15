export { getCommentsByUser } from "./user.comments.controller.js";
import * as userService from "../services/user.service.js";
import { getPostsByAuthorId } from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // For the lab/demo we treat login as a lookup by email and return the numeric id as a token
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Return a simple token (the numeric user id) which the demo auth middleware expects
  return res.status(200).json(new ApiResponse(200, { token: String(user.id), user }, 'Logged in'));
});

export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(new ApiResponse(201, "User created successfully", user));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(new ApiResponse(200, "Users fetched successfully", users));
});


export const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await getPostsByAuthorId(userId);

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};