"use client";

import { useEffect, useState } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Chỉ redirect khi không loading và đã mount
    if (!isLoading && isMounted) {
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
  }, [isAuthenticated, isLoading, pathname, router, isMounted]);

  // Hiển thị loading khi đang kiểm tra auth status hoặc chưa mount
  if (isLoading || !isMounted) {
    return <FullPageLoader text="Đang kiểm tra trạng thái đăng nhập..." />;
  }

  return <>{children}</>;
} 