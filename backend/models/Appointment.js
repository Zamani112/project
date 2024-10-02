const db = require('../config/database');

class Appointment {
  static async create(appointmentData) {
    const { patient_id, doctor_id, date, time, status } = appointmentData;
    const [result] = await db.execute(
      'INSERT INTO appointments (patient_id, doctor_id, date, time, status) VALUES (?, ?, ?, ?, ?)',
      [patient_id, doctor_id, date, time, status]
    );
    return { id: result.insertId, ...appointmentData };
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM appointments WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM appointments WHERE patient_id = ? OR doctor_id = ?',
      [userId, userId]
    );
    return rows;
  }

  static async update(id, updateData) {
    const { status } = updateData;
    await db.execute('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);
    return { id, ...updateData };
  }
}

module.exports = Appointment;