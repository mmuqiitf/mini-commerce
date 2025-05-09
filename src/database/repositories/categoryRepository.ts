import { Category } from '../../models/category';
import { executeQuery } from '../connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const createCategory = async (category: Category): Promise<Category> => {
  const query =
    'INSERT INTO categories (name, description, parent_id) VALUES (?, ?, ?)';
  const params = [category.name, category.description, category.parent_id];
  const result = await executeQuery<ResultSetHeader>(query, params);
  return { id: result.insertId, ...category };
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  const query = 'SELECT * FROM categories WHERE id = ?';
  const params = [id];
  const rows = await executeQuery<Category[] & RowDataPacket[]>(query, params);
  return rows.length > 0 ? rows[0] : null;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const query = 'SELECT * FROM categories';
  const rows = await executeQuery<Category[] & RowDataPacket[]>(query);
  return rows;
};

export const updateCategory = async (
  id: number,
  category: Partial<Category>,
): Promise<boolean> => {
  const query =
    'UPDATE categories SET name = ?, description = ?, parent_id = ? WHERE id = ?';
  const params = [category.name, category.description, category.parent_id, id];
  const result = await executeQuery<ResultSetHeader>(query, params);
  return result.affectedRows > 0;
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM categories WHERE id = ?';
  const params = [id];
  const result = await executeQuery<ResultSetHeader>(query, params);
  return result.affectedRows > 0;
};
