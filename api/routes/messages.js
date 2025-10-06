const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /api/messages/stats - Get message statistics (must be before /:id routes)
router.get('/stats', async (req, res) => {
  try {
    const totalMessages = await Message.countDocuments();
    const newMessages = await Message.countDocuments({ status: 'new' });
    const readMessages = await Message.countDocuments({ status: 'read' });
    const repliedMessages = await Message.countDocuments({ status: 'replied' });
    const archivedMessages = await Message.countDocuments({ status: 'archived' });
    const unreadMessages = await Message.countDocuments({ isRead: false });

    // Messages from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentMessages = await Message.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      stats: {
        total: totalMessages,
        new: newMessages,
        read: readMessages,
        replied: repliedMessages,
        archived: archivedMessages,
        unread: unreadMessages,
        recent: recentMessages
      }
    });
  } catch (error) {
    console.error('Error fetching message stats:', error);
    res.status(500).json({
      success: false,
      message: 'Chyba pri načítavaní štatistík'
    });
  }
});

// GET /api/messages - Get all messages (admin only)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Message.countDocuments(query);
    const unreadCount = await Message.countDocuments({ isRead: false });

    res.json({
      success: true,
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Chyba pri načítavaní správ'
    });
  }
});

// POST /api/messages - Create new message (from contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Všetky povinné polia musia byť vyplnené'
      });
    }

    const newMessage = new Message({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Správa bola úspešne odoslaná',
      data: newMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      message: 'Chyba pri odosielaní správy'
    });
  }
});

// PUT /api/messages/:id/read - Mark message as read
router.put('/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Správa nebola nájdená'
      });
    }

    res.json({
      success: true,
      message: 'Správa označená ako prečítaná',
      data: message
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      message: 'Chyba pri označovaní správy'
    });
  }
});

// PUT /api/messages/:id/status - Update message status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Neplatný status správy'
      });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Správa nebola nájdená'
      });
    }

    res.json({
      success: true,
      message: 'Status správy bol aktualizovaný',
      data: message
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({
      success: false,
      message: 'Chyba pri aktualizácii statusu'
    });
  }
});

// PUT /api/messages/:id/notes - Add notes to message
router.put('/:id/notes', async (req, res) => {
  try {
    const { notes } = req.body;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { notes: notes?.trim() },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Správa nebola nájdená'
      });
    }

    res.json({
      success: true,
      message: 'Poznámky boli aktualizované',
      data: message
    });
  } catch (error) {
    console.error('Error updating message notes:', error);
    res.status(500).json({
      success: false,
      message: 'Chyba pri aktualizácii poznámok'
    });
  }
});

// DELETE /api/messages/:id - Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Správa nebola nájdená'
      });
    }

    res.json({
      success: true,
      message: 'Správa bola odstránená'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: 'Chyba pri odstraňovaní správy'
    });
  }
});

module.exports = router;
