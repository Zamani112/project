const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, role } = userData;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
      );
      console.log('User created successfully:', result.insertId);
      return { id: result.insertId, name, email, role };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      console.log('Searching for user with email:', email);
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email + '']);
      console.log('User found by email:', rows[0] ? rows[0].id : 'Not found');
      return rows[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
      console.log('User found by ID:', rows[0] ? rows[0].id : 'Not found');
      return rows[0];
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  static async update(user) {
    try {
      const [result] = await pool.execute(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [user.name, user.email, user.password, user.id]
      );
      console.log('User updated successfully:', user.id);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

module.exports = User;