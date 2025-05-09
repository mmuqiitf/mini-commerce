import { executeQuery, executeTransaction } from '../connection';
import { RowDataPacket, ResultSetHeader, Connection } from 'mysql2/promise';

// User interface
export interface User extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: 'customer' | 'admin';
  auth_type: 'local' | 'google' | 'facebook';
  auth_id: string | null;
  created_at: Date;
  updated_at: Date;
}

// CreateUser interface - for user creation
export interface CreateUser {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: 'customer' | 'admin';
  auth_type?: 'local' | 'google' | 'facebook';
  auth_id?: string;
}

// User repository class
class UserRepository {
  // Create a new user
  async create(userData: CreateUser): Promise<User> {
    const sql = `
      INSERT INTO users (
        username, email, password, first_name, last_name, 
        phone, role, auth_type, auth_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      userData.username,
      userData.email,
      userData.password,
      userData.first_name || null,
      userData.last_name || null,
      userData.phone || null,
      userData.role || 'customer',
      userData.auth_type || 'local',
      userData.auth_id || null,
    ];

    const result = await executeQuery<ResultSetHeader>(sql, params);

    return this.findById(result.insertId) as Promise<User>;
  }

  // Find user by ID
  async findById(id: number): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
    const results = await executeQuery<User[]>(sql, [id]);

    return results.length > 0 ? results[0] : null;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    const results = await executeQuery<User[]>(sql, [email]);

    return results.length > 0 ? results[0] : null;
  }

  // Find user by username
  async findByUsername(username: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const results = await executeQuery<User[]>(sql, [username]);

    return results.length > 0 ? results[0] : null;
  }

  // Find user by auth provider ID
  async findByAuthId(authType: string, authId: string): Promise<User | null> {
    const sql =
      'SELECT * FROM users WHERE auth_type = ? AND auth_id = ? LIMIT 1';
    const results = await executeQuery<User[]>(sql, [authType, authId]);

    return results.length > 0 ? results[0] : null;
  }

  // Update user
  async update(
    id: number,
    userData: Partial<CreateUser>,
  ): Promise<User | null> {
    // Build dynamic SET clause and params
    const entries = Object.entries(userData);

    if (entries.length === 0) return this.findById(id);

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const params = [...entries.map(([_, value]) => value), id];

    const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
    await executeQuery<ResultSetHeader>(sql, params);

    return this.findById(id);
  }

  // Delete user
  async delete(id: number): Promise<boolean> {
    const sql = 'DELETE FROM users WHERE id = ?';
    const result = await executeQuery<ResultSetHeader>(sql, [id]);

    return result.affectedRows > 0;
  }

  // Get all users
  async findAll(limit = 50, offset = 0): Promise<User[]> {
    const sql = 'SELECT * FROM users LIMIT ? OFFSET ?';
    return executeQuery<User[]>(sql, [limit, offset]);
  }

  // Find users by role
  async findByRole(role: string, limit = 50, offset = 0): Promise<User[]> {
    const sql = 'SELECT * FROM users WHERE role = ? LIMIT ? OFFSET ?';
    return executeQuery<User[]>(sql, [role, limit, offset]);
  }
}

export default new UserRepository();
