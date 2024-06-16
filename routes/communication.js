// Mock-up example of a chat system

const express = require('express');
const router = express.Router();

const chats = []; // In-memory storage for simplicity
let nextChatId = 1; // Counter for generating unique chat IDs

// Establish chat connection
router.post('/start', (req, res) => {
  const { founderId, freelancerId, projectId } = req.body;
  const chatId = `chat${nextChatId++}`; // Generate unique chatId
  const chat = { chatId, founderId, freelancerId, projectId, messages: [] };
  chats.push(chat);
  res.status(201).json(chat);
});

// Send message
router.post('/message', (req, res) => {
    const { chatId, senderId, message } = req.body;
    const chat = chats.find(c => c.chatId === chatId); // Use 'chatId' instead of 'id'
    if (chat) {
      chat.messages.push({ senderId, message, timestamp: new Date() });
      res.status(201).json(chat);
    } else {
      res.status(404).json({ message: 'Chat not found' });
    }
  });
  
module.exports = router;
