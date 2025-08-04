// Auth utility functions

let isRedirecting = false;
let redirectTimeout: NodeJS.Timeout | null = null;

export const safeRedirect = (router: { replace: (path: string) => void }, path: string, delay = 100) => {
  if (isRedirecting) return;
  
  isRedirecting = true;
  
  if (redirectTimeout) {
    clearTimeout(redirectTimeout);
  }
  
  redirectTimeout = setTimeout(() => {
    router.replace(path);
    
    // Reset flag after redirect
    setTimeout(() => {
      isRedirecting = false;
    }, 1000);
  }, delay);
};

export const clearRedirectFlag = () => {
  isRedirecting = false;
  if (redirectTimeout) {
    clearTimeout(redirectTimeout);
    redirectTimeout = null;
  }
};

// Check if current route needs authentication
export const isProtectedRoute = (pathname: string): boolean => {
  const protectedPaths = ['/dashboard', '/(Admin)'];
  return protectedPaths.some(path => pathname.startsWith(path));
};

// Check if current route is auth-related
export const isAuthRoute = (pathname: string): boolean => {
  const authPaths = ['/login', '/register', '/verify-email'];
  return authPaths.includes(pathname);
};

// Check if current route is public
export const isPublicRoute = (pathname: string): boolean => {
  const publicPaths = ['/', '/about', '/contact'];
  return publicPaths.includes(pathname);
};