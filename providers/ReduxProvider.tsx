"use client";

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { initializeAuth } from '@/lib/store/auth-initializer';

// Initialize auth status check
initializeAuth();

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
} 