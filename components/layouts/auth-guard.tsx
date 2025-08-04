'use client';

import { useProfile } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { logger } from '@/lib/logger';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading } = useProfile();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!profile?.user) {
        logger.warn('User not authenticated, redirecting to login');
        router.replace('/login');
      } else {
        logger.info('User authenticated successfully', { userId: profile.user.id });
        setIsVerified(true);
      }
    }
  }, [profile, isLoading, router]);

  if (!isVerified) {
    // Hiển thị skeleton loading trong khi chờ xác thực
    return (
      <div className="p-4">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
