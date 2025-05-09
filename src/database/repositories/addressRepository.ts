import { Address } from '../../models/address';
import { executeQuery } from '../connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const addressRepository = {
  async create(
    address: Omit<Address, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Address> {
    // If is_default is true, set all other addresses for this user to false
    if (address.is_default) {
      const updateQuery =
        'UPDATE addresses SET is_default = 0 WHERE user_id = ?';
      await executeQuery<ResultSetHeader>(updateQuery, [address.user_id]);
    }

    const query = `
      INSERT INTO addresses 
      (user_id, street, city, state, postal_code, country, is_default) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      address.user_id,
      address.street,
      address.city,
      address.state || null,
      address.postal_code,
      address.country,
      address.is_default || false,
    ];

    const result = await executeQuery<ResultSetHeader>(query, params);

    if (result.affectedRows === 0) {
      throw new Error('Address creation failed, no rows affected.');
    }

    return {
      id: result.insertId,
      ...address,
    };
  },

  async findById(id: number): Promise<Address | null> {
    const query = 'SELECT * FROM addresses WHERE id = ?';
    const rows = await executeQuery<Address[] & RowDataPacket[]>(query, [id]);

    return rows.length > 0 ? rows[0] : null;
  },

  async findByUserId(userId: number): Promise<Address[]> {
    const query =
      'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC';
    const rows = await executeQuery<Address[] & RowDataPacket[]>(query, [
      userId,
    ]);

    return rows;
  },

  async update(id: number, address: Partial<Address>): Promise<boolean> {
    // Start building the SQL query
    let query = 'UPDATE addresses SET ';
    const params: any[] = [];
    const updateFields: string[] = [];

    // Add each field that needs to be updated
    if (address.street !== undefined) {
      updateFields.push('street = ?');
      params.push(address.street);
    }

    if (address.city !== undefined) {
      updateFields.push('city = ?');
      params.push(address.city);
    }

    if (address.state !== undefined) {
      updateFields.push('state = ?');
      params.push(address.state);
    }

    if (address.postal_code !== undefined) {
      updateFields.push('postal_code = ?');
      params.push(address.postal_code);
    }

    if (address.country !== undefined) {
      updateFields.push('country = ?');
      params.push(address.country);
    }

    // Special handling for is_default
    if (address.is_default === true) {
      // Get the user_id for this address
      const addressData = await this.findById(id);
      if (addressData) {
        // Reset all other addresses for this user
        await executeQuery<ResultSetHeader>(
          'UPDATE addresses SET is_default = 0 WHERE user_id = ?',
          [addressData.user_id],
        );
      }
      updateFields.push('is_default = ?');
      params.push(true);
    } else if (address.is_default === false) {
      updateFields.push('is_default = ?');
      params.push(false);
    }

    // If there's nothing to update, return early
    if (updateFields.length === 0) {
      return false;
    }

    // Complete the query
    query += updateFields.join(', ');
    query += ' WHERE id = ?';
    params.push(id);

    // Execute the update
    const result = await executeQuery<ResultSetHeader>(query, params);
    return result.affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM addresses WHERE id = ?';
    const result = await executeQuery<ResultSetHeader>(query, [id]);

    return result.affectedRows > 0;
  },

  async setDefault(id: number, userId: number): Promise<boolean> {
    // First, set all addresses for this user to non-default
    await executeQuery<ResultSetHeader>(
      'UPDATE addresses SET is_default = 0 WHERE user_id = ?',
      [userId],
    );

    // Then set the specified address as default
    const query =
      'UPDATE addresses SET is_default = 1 WHERE id = ? AND user_id = ?';
    const result = await executeQuery<ResultSetHeader>(query, [id, userId]);

    return result.affectedRows > 0;
  },
};
