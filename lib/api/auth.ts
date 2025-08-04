import { apiClient } from './axios-client';
import { logger } from '@/lib/logger';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name: string;
    isEmailVerified: boolean;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  message: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckEmailResponse {
  exists: boolean;
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

  async checkEmail(email: string): Promise<CheckEmailResponse> {
    const response = await apiClient.get<CheckEmailResponse>('/auth/check-email', {
      params: { email }
    });
    return response.data;
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.get<{ message: string }>('/auth/verify-email', {
      params: { token }
    });
    return response.data;
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await apiClient.get<{ user: User }>('/auth/me');
    return response.data;
  }

  async logout(): Promise<{ message: string }> {
    try {
      const token = this.getStoredToken();
      if (token) {
        const response = await apiClient.post<{ message: string }>('/auth/logout');
        return response.data;
      } else {
        // Nếu không có token, chỉ trả về message thành công
        return { message: 'Logged out successfully' };
      }
    } catch {
      // Nếu có lỗi từ server, vẫn coi như logout thành công
      return { message: 'Logged out successfully' };
    }
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

  clearAuthData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  saveAuthData(data: AuthResponse) {
    if (typeof window !== 'undefined') {
      logger.info('Saving auth data to localStorage', { userId: data.user.id });
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('access_token', data.token);
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
