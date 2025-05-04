// Database configuration
const { Pool } = require('pg');
require('dotenv').config();

// Check for required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(`Warning: Missing the following database environment variables: ${missingEnvVars.join(', ')}`);
  console.warn('Using fallback values for development. DO NOT use fallback values in production!');
}

// Database configuration using environment variables with fallbacks for development
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || '192.168.50.93',
  database: process.env.DB_NAME || 'jusbook_new_app',
  password: process.env.DB_PASSWORD || 'admin@1234',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
