# Redux Toolkit Setup cho Authentication

## Cấu trúc thư mục

```
lib/store/
├── index.ts              # Store configuration
├── hooks.ts              # Typed hooks
├── slices/
│   └── authSlice.ts      # Auth slice với async thunks
└── selectors/
    └── authSelectors.ts  # Memoized selectors
```

## Cách sử dụng

### 1. Sử dụng hook `useAuthRedux`

```typescript
import { useAuthRedux } from '@/hooks/use-auth-redux';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error,
    login, 
    register, 
    logout 
  } = useAuthRedux();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {isLoading ? 'Loading...' : user?.name}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

### 2. Sử dụng selectors trực tiếp

```typescript
import { useAppSelector } from '@/lib/store/hooks';
import { selectUser, selectIsAuthenticated } from '@/lib/store/selectors/authSelectors';

function MyComponent() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div>
      {isAuthenticated ? `Welcome ${user?.name}` : 'Please login'}
    </div>
  );
}
```

### 3. Dispatch actions trực tiếp

```typescript
import { useAppDispatch } from '@/lib/store/hooks';
import { loginUser, logoutUser } from '@/lib/store/slices/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ 
        email: 'user@example.com', 
        password: 'password' 
      })).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };
}
```

## Features

### ✅ Async Thunks
- `loginUser`: Đăng nhập với email/password
- `registerUser`: Đăng ký tài khoản mới
- `logoutUser`: Đăng xuất
- `checkAuthStatus`: Kiểm tra trạng thái auth từ localStorage

### ✅ State Management
- User information
- Authentication token
- Loading states
- Error handling
- Persistent storage (localStorage)

### ✅ Selectors
- Memoized selectors cho performance
- Derived selectors cho computed values
- Type-safe selectors

### ✅ Error Handling
- Centralized error handling
- User-friendly error messages
- Automatic error clearing

### ✅ TypeScript Support
- Fully typed actions và state
- Type-safe hooks và selectors
- IntelliSense support

## Redux DevTools

Trong development mode, bạn có thể sử dụng Redux DevTools để debug:

1. Mở Chrome DevTools (F12)
2. Chọn tab "Redux"
3. Xem state changes và actions

## Migration từ Context API

Để migrate từ Context API sang Redux:

1. Thay thế `useAuth()` bằng `useAuthRedux()`
2. Cập nhật components để sử dụng Redux state
3. Xóa `AuthProvider` khỏi layout
4. Thêm `ReduxProvider` vào layout

## Benefits

- **Performance**: Memoized selectors và optimized re-renders
- **Debugging**: Redux DevTools integration
- **Scalability**: Easy to add new features
- **Type Safety**: Full TypeScript support
- **Testing**: Easy to test actions và reducers 