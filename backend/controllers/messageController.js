const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver_id, content } = req.body;
    const message = await Message.create({
      sender_id: req.user.id,
      receiver_id,
      content,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findByUserId(req.user.id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.markAsRead(req.params.id, req.user.id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};