import { Request, Response } from 'express';
import {
  createItem,
  getItems,
  // Removing unused imports
} from '../../controllers/itemController';
import { items } from '../../models/item';
import { AppError } from '../../middlewares/errorHandler';

// Mock Express request and response
const mockRequest = () => {
  const req: Partial<Request> = {};
  req.body = {};
  req.params = {};
  return req as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockNext = jest.fn();

describe('Item Controller', () => {
  // Clear the items array before each test
  beforeEach(() => {
    items.length = 0;
  });

  describe('createItem', () => {
    it('should create a new item with valid data', async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.body = { name: 'Test Item' };

      await createItem(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'success',
          data: {
            item: expect.objectContaining({
              name: 'Test Item',
            }),
          },
        }),
      );
      expect(items.length).toBe(1);
      expect(items[0].name).toBe('Test Item');
    });

    it('should return 400 if name is missing', async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.body = {};

      await createItem(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(AppError));
      const error = mockNext.mock.calls[0][0];
      expect(error.message).toBe('Name is required');
      expect(error.status).toBe(400);
      expect(items.length).toBe(0);
    });
  });

  describe('getItems', () => {
    it('should return all items', async () => {
      const req = mockRequest();
      const res = mockResponse();

      items.push({ id: 1, name: 'Item 1' });
      items.push({ id: 2, name: 'Item 2' });

      await getItems(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        results: 2,
        data: {
          items: items,
        },
      });
    });
  });

  // Add more tests for other controller methods as needed
});
