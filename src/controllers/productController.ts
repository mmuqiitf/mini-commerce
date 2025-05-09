import { Request, Response, NextFunction } from 'express';
import productRepository, {
  CreateProduct,
} from '../database/repositories/productRepository';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const productController = {
  /**
   * Create a new product
   */
  async createProduct(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const productData: CreateProduct = req.body;

      const product = await productRepository.create(productData);

      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get a product by ID
   */
  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID',
        });
        return;
      }

      const product = await productRepository.findById(id);

      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get a product by code
   */
  async getProductByCode(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { code } = req.params;

      const product = await productRepository.findByCode(code);

      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all products with pagination and filtering
   */
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const offset = req.query.offset
        ? parseInt(req.query.offset as string)
        : 0;
      const category = req.query.category
        ? parseInt(req.query.category as string)
        : undefined;
      const search = req.query.search as string | undefined;

      let products;

      if (search) {
        products = await productRepository.searchByName(search, limit, offset);
      } else if (category) {
        products = await productRepository.findByCategory(
          category,
          limit,
          offset,
        );
      } else {
        products = await productRepository.findAll(limit, offset);
      }

      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update a product
   */
  async updateProduct(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID',
        });
        return;
      }

      const updateData: Partial<CreateProduct> = req.body;

      // Prevent updating code directly for security
      if (updateData.code) {
        delete updateData.code;
      }

      const product = await productRepository.update(id, updateData);

      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update product stock
   */
  async updateProductStock(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID',
        });
        return;
      }

      const { quantity } = req.body;

      if (typeof quantity !== 'number') {
        res.status(400).json({
          success: false,
          message: 'Quantity must be a number',
        });
        return;
      }

      const product = await productRepository.updateStock(id, quantity);

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete a product
   */
  async deleteProduct(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID',
        });
        return;
      }

      const deleted = await productRepository.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Product not found or could not be deleted',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get products with low stock
   */
  async getLowStockProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const threshold = req.query.threshold
        ? parseInt(req.query.threshold as string)
        : 10;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const offset = req.query.offset
        ? parseInt(req.query.offset as string)
        : 0;

      const products = await productRepository.getLowStock(
        threshold,
        limit,
        offset,
      );

      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
};
