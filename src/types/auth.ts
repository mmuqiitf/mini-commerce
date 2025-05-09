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
  user: {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
  };
}
