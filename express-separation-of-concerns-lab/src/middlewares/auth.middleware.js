// src/middlewares/auth.middleware.js
// Minimal authentication middleware for the lab exercises.
// Expected to export a named `authMiddleware` function used by routes.

export function authMiddleware(req, res, next) {
  // Expect an Authorization header in the form: "Bearer <userId>"
  const authHeader = req.headers && req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format. Use \"Bearer <userId>\" for the demo.' });
  }

  const token = parts[1];
  // For this demo app we treat the token as a numeric user id.
  const userId = parseInt(token, 10);
  if (Number.isNaN(userId)) {
    return res.status(401).json({ message: 'Invalid token. For demo use a numeric user id as the token.' });
  }

  // Attach a minimal user object expected by controllers
  req.user = { id: userId };
  return next();
}

export default authMiddleware;
