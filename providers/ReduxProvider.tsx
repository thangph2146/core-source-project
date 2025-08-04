"use client";

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { initializeAuth } from '@/lib/store/auth-initializer';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth status check after component mounts
    initializeAuth();
  }, []);

  return <Provider store={store}>{children}</Provider>;
} 