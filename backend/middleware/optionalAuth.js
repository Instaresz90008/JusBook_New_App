
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware for optional authentication
// It will set req.user if a valid token is provided, otherwise it will continue
const optionalAuth = (req, res, next) => {
  try {
    // Get token from cookies instead of headers
    const token = req.cookies.auth_token;
    
    // If no token is provided, continue without setting req.user
    if (!token) {
      return next();
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Add user info to request
    } catch (error) {
      // If token is invalid, continue without setting req.user
      console.warn('Invalid token provided in optional auth:', error.message);
    }
    
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

module.exports = optionalAuth;
