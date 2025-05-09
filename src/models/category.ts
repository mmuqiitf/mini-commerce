export interface Category {
  id?: number;
  name: string;
  description?: string;
  parent_id?: number | null;
  created_at?: Date;
  updated_at?: Date;
}
