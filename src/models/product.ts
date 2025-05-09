export interface Product {
  id?: number;
  code: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category_id?: number | null;
  created_at?: Date;
  updated_at?: Date;
}
