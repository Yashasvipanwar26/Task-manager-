const jwt = require('jsonwebtoken');

// This middleware checks if the user is logged in
// It runs before any protected route
function authMiddleware(req, res, next) {

  // Get token from request headers
  // Token is sent as: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, please login first' });
  }

  // Token format is "Bearer tokenvalue"
  // So we split by space and take the second part
  const token = authHeader.split(' ')[1];

  // Verify the token using our secret key
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request object
    // So route handlers can access req.user
    req.user = decoded;

    // Move to next middleware or route handler
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
