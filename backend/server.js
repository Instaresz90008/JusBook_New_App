
const app = require('./app');
const setupDatabase = require('./scripts/init-db');

const PORT = process.env.PORT || 5000;

// Initialize database tables then start server
const startServer = async () => {
  try {
    await setupDatabase();
    
    app.listen(PORT, () => {
      console.log(`Tara Voice Assistant API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
