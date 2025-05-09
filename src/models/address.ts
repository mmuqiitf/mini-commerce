export interface Address {
  id?: number;
  user_id: number;
  street: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
