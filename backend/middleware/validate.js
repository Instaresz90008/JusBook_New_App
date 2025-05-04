
/**
 * Middleware for request validation
 * @param {Function} schema - Validation schema function that takes req as parameter and returns errors if any
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema(req);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message || 'Validation failed',
        details: error.details
      });
    }
    
    next();
  };
};

module.exports = validate;
