import { Request, Response } from 'express';
import * as categoryRepository from '../database/repositories/categoryRepository';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryRepository.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryRepository.getCategoryById(
      parseInt(req.params.id),
    );
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const success = await categoryRepository.updateCategory(
      parseInt(req.params.id),
      req.body,
    );
    if (success) {
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res
        .status(404)
        .json({ message: 'Category not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const success = await categoryRepository.deleteCategory(
      parseInt(req.params.id),
    );
    if (success) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
