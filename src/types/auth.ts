import { User } from '../models/user';

export interface RegisterRequestBody {
  email?: string;
  phone?: string;
  password: string;
  name: string;
}

export interface LoginRequestBody {
  email?: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
