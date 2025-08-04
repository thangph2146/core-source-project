import { apiClient } from './axios-client';
import { logger } from '@/lib/logger';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  service?: string;
  database?: string;
  connection?: string;
  userCount?: number;
  postgresql_version?: string;
  error?: string;
}

class AuthApi {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await apiClient.get<{ user: User }>('/auth/profile');
    return response.data;
  }

  // Health check methods
  async getHealth(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>('/health');
    return response.data;
  }

  async getDatabaseHealth(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>('/health/database');
    return response.data;
  }

  async getVersion(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>('/health/version');
    return response.data;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  saveAuthData(data: AuthResponse) {
    if (typeof window !== 'undefined') {
      logger.info('Saving auth data to localStorage', { userId: data.user.id });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      logger.info('Auth data saved successfully');
    }
  }

  getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }
}

export const authApi = new AuthApi();
