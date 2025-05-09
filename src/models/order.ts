export interface Order {
  id: number;
  number: string;
  user_id: number;
  address_id: number;
  status: OrderStatus;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: number;
  number: string | null;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface CreateOrderInput {
  user_id: number;
  address_id: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  product_id: number;
  quantity: number;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}
