import { executeQuery } from '../connection';
import { User } from '../../models/user';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const userRepository = {
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    const params = [email];
    const rows = await executeQuery<User[] & RowDataPacket[]>(query, params);
    return rows[0] || null;
  },

  async findByPhone(phone: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE phone = ? LIMIT 1';
    const params = [phone];
    const rows = await executeQuery<User[] & RowDataPacket[]>(query, params);
    return rows[0] || null;
  },

  async create(
    userData: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<User> {
    const { email, phone, password, name } = userData;
    if (!email && !phone) {
      throw new Error(
        'Either email or phone must be provided to create a user.',
      );
    }
    const userEmail = email || null;
    const userPhone = phone || null;

    const insertQuery =
      'INSERT INTO users (email, phone, password, name) VALUES (?, ?, ?, ?)';
    const insertParams = [userEmail, userPhone, password, name];
    const insertResult = await executeQuery<ResultSetHeader>(
      insertQuery,
      insertParams,
    );

    if (insertResult.affectedRows === 0) {
      throw new Error('User creation failed, no rows affected.');
    }
    if (insertResult.insertId === 0) {
      throw new Error(
        "User creation failed, no insertId returned. Ensure 'id' is AUTO_INCREMENT.",
      );
    }

    const selectQuery = 'SELECT * FROM users WHERE id = ?';
    const selectParams = [insertResult.insertId];
    const newUserResult = await executeQuery<User[] & RowDataPacket[]>(
      selectQuery,
      selectParams,
    );

    if (!newUserResult || newUserResult.length === 0) {
      throw new Error('Failed to fetch user after creation');
    }
    return newUserResult[0];
  },
};
