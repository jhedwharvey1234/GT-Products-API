import { body, validationResult } from 'express-validator';

// Shared result handler to avoid repeating code
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateComment = [
  body('content').trim().notEmpty().withMessage('Content is required.'),
  body('authorId').isInt({ min: 1 }).withMessage('A valid author ID is required.'),
  handleValidation,
];

export const validateRegistration = [
  body('username').trim().notEmpty().withMessage('Username is required.'),
  body('email').isEmail().withMessage('A valid email is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  handleValidation,
];

export const validateLogin = [
  body('email').isEmail().withMessage('A valid email is required.'),
  // password may be optional in this demo app depending on backend; validate presence if expected
  handleValidation,
];

export const validatePost = [
  body('title').trim().notEmpty().withMessage('Title is required.'),
  body('content').trim().notEmpty().withMessage('Content is required.'),
  handleValidation,
];

export const validateUser = [
  body('username').trim().notEmpty().withMessage('Username is required.'),
  body('email').isEmail().withMessage('Valid email is required.'),
  handleValidation,
];