// lib/store/auth-initializer.ts
import { store } from './index';
import { checkAuthStatus } from './slices/authSlice';

let authInitialized = false;

export const initializeAuth = () => {
  if (!authInitialized) {
    authInitialized = true;
    store.dispatch(checkAuthStatus());
  }
};
