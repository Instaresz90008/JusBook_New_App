
require('dotenv').config();

const environment = {
  // Server settings
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000'),
  
  // Frontend URL for CORS
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:8080',
  
  // JWT settings
  JWT_SECRET: process.env.JWT_SECRET || 'development_secret_key',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '24h',
  
  // Database settings already in db.js
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  isDevelopment: function() {
    return this.NODE_ENV === 'development';
  },
  
  isProduction: function() {
    return this.NODE_ENV === 'production';
  },
  
  isTest: function() {
    return this.NODE_ENV === 'test';
  }
};

// Warn if JWT_SECRET is using the default value in production
if (environment.isProduction() && environment.JWT_SECRET === 'development_secret_key') {
  console.error('WARNING: Using default JWT_SECRET in production environment!');
}

module.exports = environment;
