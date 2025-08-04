"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthRedux } from '@/hooks/use-auth-redux';
import { FullPageLoader } from '@/components/ui/loading-spinner';
import { safeRedirect, isProtectedRoute, isAuthRoute } from '@/lib/utils/auth-utils';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuardRedux({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthRedux();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Chỉ redirect khi không loading
    if (!isLoading) {
      const needsAuth = isProtectedRoute(pathname);
      const isAuth = isAuthRoute(pathname);
      
      // Nếu chưa đăng nhập và đang ở trang cần auth
      if (!isAuthenticated && needsAuth) {
        safeRedirect(router, '/login');
      }
      
      // Nếu đã đăng nhập và đang ở trang auth
      else if (isAuthenticated && isAuth) {
        safeRedirect(router, '/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Hiển thị loading khi đang kiểm tra auth status
  if (isLoading) {
    return <FullPageLoader text="Đang kiểm tra trạng thái đăng nhập..." />;
  }

  return <>{children}</>;
} 