import { Request, Response, NextFunction } from 'express';
import { items, Item } from '../models/item';
import { AppError } from '../middlewares/errorHandler';

// Helper function for async error handling
const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create an item
export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  
  if (!name) {
    throw new AppError('Name is required', 400);
  }
  
  const newItem: Item = { id: Date.now(), name };
  items.push(newItem);
  
  res.status(201).json({
    status: 'success',
    data: {
      item: newItem,
    },
  });
});

// Read all items
export const getItems = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

// Read single item
export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  
  if (!item) {
    throw new AppError(`Item with ID ${id} not found`, 404);
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

// Update an item
export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;
  
  if (!name) {
    throw new AppError('Name is required', 400);
  }
  
  const itemIndex = items.findIndex((i) => i.id === id);
  
  if (itemIndex === -1) {
    throw new AppError(`Item with ID ${id} not found`, 404);
  }
  
  items[itemIndex].name = name;
  
  res.status(200).json({
    status: 'success',
    data: {
      item: items[itemIndex],
    },
  });
});

// Delete an item
export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((i) => i.id === id);
  
  if (itemIndex === -1) {
    throw new AppError(`Item with ID ${id} not found`, 404);
  }
  
  const deletedItem = items.splice(itemIndex, 1)[0];
  
  res.status(200).json({
    status: 'success',
    data: {
      item: deletedItem,
    },
  });
});
