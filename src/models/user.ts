export interface User {
  id: number;
  email: string | null;
  phone: string | null;
  password: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}
