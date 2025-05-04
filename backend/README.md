
# Tara Voice Assistant API

This is the backend API for the Tara Voice Assistant application. It provides endpoints for processing voice queries, user authentication, and conversation management.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up PostgreSQL database and update connection details in `config/db.js`

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Voice Processing
- `POST /api/conversations/query` - Process a voice query

### User Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile (protected)

### Conversations
- `GET /api/conversations/history/:userId` - Get conversation history for a user (protected)
- `GET /api/conversations/:id` - Get a specific conversation (protected)

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
