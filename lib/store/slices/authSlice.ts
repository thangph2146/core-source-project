import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi, type User, type AuthResponse, type LoginRequest, type RegisterRequest } from '@/lib/api/auth';
import { logger } from '@/lib/logger';

// Types
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      
      if (!response.user.isEmailVerified) {
        return rejectWithValue('Email chưa được xác thực. Vui lòng kiểm tra email và xác thực tài khoản trước khi đăng nhập.');
      }
      
      // Lưu vào localStorage
      authApi.saveAuthData(response);
      
      return response;
    } catch (error: unknown) {
      logger.error('Login error:', { error: String(error) });
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('400')) {
        return rejectWithValue('Email chưa được xác thực. Vui lòng kiểm tra email và xác thực tài khoản trước khi đăng nhập.');
      } else if (errorMessage.includes('401')) {
        return rejectWithValue('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
      } else {
        return rejectWithValue(errorMessage || 'Đăng nhập thất bại. Vui lòng thử lại.');
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      
      // Lưu vào localStorage
      authApi.saveAuthData(response);
      
      return response;
    } catch (error: unknown) {
      logger.error('Registration error:', { error: String(error) });
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('409')) {
        return rejectWithValue('Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.');
      } else {
        return rejectWithValue(errorMessage || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await authApi.logout();
      authApi.clearAuthData();
    } catch (error: unknown) {
      logger.error('Logout error:', { error: String(error) });
      // Vẫn xóa dữ liệu local ngay cả khi có lỗi
      authApi.clearAuthData();
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = authApi.getStoredUser();
      const storedToken = authApi.getStoredToken();
      
      if (!storedUser || !storedToken) {
        return rejectWithValue('No stored auth data');
      }

      // Validate token with server
      try {
        const profile = await authApi.getProfile();
        return { user: profile.user, token: storedToken };
      } catch {
        // Token invalid, clear data
        authApi.clearAuthData();
        return rejectWithValue('Token validation failed');
      }
    } catch (error: unknown) {
      logger.error('Check auth error:', { error: String(error) });
      authApi.clearAuthData();
      return rejectWithValue('Invalid stored auth data');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer; 