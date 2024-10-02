const db = require('../config/database');

class Message {
  static async create(messageData) {
    const { sender_id, receiver_id, content } = messageData;
    const [result] = await db.execute(
      'INSERT INTO messages (sender_id, receiver_id, content, timestamp) VALUES (?, ?, ?, NOW())',
      [sender_id, receiver_id, content]
    );
    return { id: result.insertId, ...messageData, timestamp: new Date() };
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp DESC',
      [userId, userId]
    );
    return rows;
  }

  static async markAsRead(id, userId) {
    await db.execute(
      'UPDATE messages SET read_at = NOW() WHERE id = ? AND receiver_id = ? AND read_at IS NULL',
      [id, userId]
    );
    const [rows] = await db.execute('SELECT * FROM messages WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Message;