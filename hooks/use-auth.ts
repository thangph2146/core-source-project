import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi, LoginRequest, RegisterRequest, AuthResponse, User } from '@/lib/api/auth';
import { toast } from 'react-hot-toast';

// Query keys
const AUTH_KEYS = {
  profile: ['auth', 'profile'] as const,
  health: ['health'] as const,
  database: ['health', 'database'] as const,
  version: ['health', 'version'] as const,
};

// Hook để lấy thông tin profile user
export const useProfile = () => {
  return useQuery({
    queryKey: AUTH_KEYS.profile,
    queryFn: () => authApi.getProfile(),
    enabled: !!authApi.getStoredToken(), // Chỉ chạy khi có token
    retry: false,
  });
};

// Hook để login
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data: AuthResponse) => {
      // Lưu auth data
      authApi.saveAuthData(data);
      
      // Invalidate profile query để fetch lại data
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
      
      // Hiển thị thông báo thành công
      toast.success('Đăng nhập thành công!');
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Đăng nhập thất bại';
      toast.error(message);
    },
  });
};

// Hook để register
export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data: AuthResponse) => {
      // Lưu auth data
      authApi.saveAuthData(data);
      
      // Invalidate profile query
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
      
      // Hiển thị thông báo thành công
      toast.success('Đăng ký thành công!');
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Đăng ký thất bại';
      toast.error(message);
    },
  });
};

// Hook để logout
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      authApi.logout();
    },
    onSuccess: () => {
      // Clear tất cả cached data
      queryClient.clear();
      
      // Hiển thị thông báo
      toast.success('Đã đăng xuất');
      
      // Redirect to login
      router.push('/login');
    },
  });
};

// Hook để kiểm tra health API
export const useHealth = () => {
  return useQuery({
    queryKey: AUTH_KEYS.health,
    queryFn: () => authApi.getHealth(),
    refetchInterval: 30000, // Refetch mỗi 30 giây
  });
};

// Hook để kiểm tra database health
export const useDatabaseHealth = () => {
  return useQuery({
    queryKey: AUTH_KEYS.database,
    queryFn: () => authApi.getDatabaseHealth(),
    refetchInterval: 30000, // Refetch mỗi 30 giây
  });
};

// Hook để lấy PostgreSQL version
export const useVersion = () => {
  return useQuery({
    queryKey: AUTH_KEYS.version,
    queryFn: () => authApi.getVersion(),
    refetchInterval: 60000, // Refetch mỗi 1 phút
  });
};

// Hook để lấy stored user từ localStorage
export const useStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    return authApi.getStoredUser();
  }
  return null;
};