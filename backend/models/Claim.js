const db = require('../config/database');

class Claim {
  static async create(claimData) {
    const { patient_id, service, amount, date, status } = claimData;
    const [result] = await db.execute(
      'INSERT INTO claims (patient_id, service, amount, date, status) VALUES (?, ?, ?, ?, ?)',
      [patient_id, service, amount, date, status]
    );
    return { id: result.insertId, ...claimData };
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM claims WHERE patient_id = ?', [userId]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM claims WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, updateData) {
    const { status } = updateData;
    await db.execute('UPDATE claims SET status = ? WHERE id = ?', [status, id]);
    return { id, ...updateData };
  }
}

module.exports = Claim;