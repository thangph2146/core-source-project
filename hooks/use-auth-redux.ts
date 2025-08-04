"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { loginUser, registerUser, logoutUser, checkAuthStatus, clearError } from '@/lib/store/slices/authSlice';
import { selectAuthState } from '@/lib/store/selectors/authSelectors';

export function useAuthRedux() {
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      // Không redirect ở đây, để AuthGuard handle
      return result;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await dispatch(registerUser({ email, password, name })).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Không redirect ở đây, để AuthGuard handle
    } catch (error) {
      // Log error nhưng không redirect
      console.error('Logout error:', error);
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearAuthError,
  };
} 