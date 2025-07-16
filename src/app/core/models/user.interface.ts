import { Expose } from 'class-transformer';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class AuthResponse {
  user!: User;
  @Expose({ name: 'access_token' })
  accessToken!: string;
  @Expose({ name: 'expires_in' })
  expiresIn!: number;
  @Expose({ name: 'refresh_token' })
  refreshToken!: string;
  @Expose({ name: 'token_type' })
  tokenType!: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  fullname: string;
  phone: string;
  passwordConfirm: string;
} 