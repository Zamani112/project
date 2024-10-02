const db = require('../config/database');

class Complaint {
  static async create(complaintData) {
    const { user_id, subject, description } = complaintData;
    const [result] = await db.execute(
      'INSERT INTO complaints (user_id, subject, description, status) VALUES (?, ?, ?, "open")',
      [user_id, subject, description]
    );
    return { id: result.insertId, ...complaintData, status: 'open' };
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM complaints WHERE user_id = ?', [userId]);
    return rows;
  }

  static async update(id, updateData) {
    const { status } = updateData;
    await db.execute('UPDATE complaints SET status = ? WHERE id = ?', [status, id]);
    return { id, ...updateData };
  }
}

module.exports = Complaint;