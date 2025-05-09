import { Request, Response } from 'express';
import { items, Item } from '../models/item';
import { AppError, asyncHandler } from '../middlewares/errorHandler';

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

// Get all items
export const getItems = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

// Get single item by ID
export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
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
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    throw new AppError(`Item with ID ${id} not found`, 404);
  }

  if (!name) {
    throw new AppError('Name is required', 400);
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
  const id = parseInt(req.params.id);
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
