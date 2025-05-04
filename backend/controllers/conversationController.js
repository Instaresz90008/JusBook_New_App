
const ConversationModel = require('../models/conversation');
const { processVoiceQuery } = require('../services/voiceService');

const conversationController = {
  // Process a new voice query
  processQuery: async (req, res) => {
    try {
      const { userId, query } = req.body;
      
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      // Process the query through our voice service
      const response = await processVoiceQuery(query);
      
      // Save the conversation to database
      const conversation = await ConversationModel.create(
        userId || 'anonymous', // Allow anonymous queries
        query,
        response
      );
      
      return res.status(200).json({ 
        success: true, 
        data: {
          id: conversation.id,
          query,
          response,
          timestamp: conversation.created_at
        }
      });
    } catch (error) {
      console.error('Error processing query:', error);
      return res.status(500).json({ error: 'Failed to process voice query' });
    }
  },

  // Get conversation history for a user
  getUserHistory: async (req, res) => {
    try {
      const userId = req.params.userId;
      const limit = req.query.limit || 10;
      
      const conversations = await ConversationModel.getByUserId(userId, limit);
      
      return res.status(200).json({
        success: true,
        data: conversations
      });
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return res.status(500).json({ error: 'Failed to fetch conversation history' });
    }
  },

  // Get a specific conversation by ID
  getConversation: async (req, res) => {
    try {
      const conversationId = req.params.id;
      
      const conversation = await ConversationModel.getById(conversationId);
      
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      
      return res.status(200).json({
        success: true,
        data: conversation
      });
    } catch (error) {
      console.error('Error fetching conversation:', error);
      return res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  }
};

module.exports = conversationController;
