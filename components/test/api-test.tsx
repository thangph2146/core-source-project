'use client';

import { useState, useEffect } from 'react';
import { authApi, User } from '@/lib/api/auth';
import { logger } from '@/lib/logger';

export default function ApiTest() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ user: User } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra user hiện tại
    const currentUser = authApi.getStoredUser();
    
    setUser(currentUser);
    
    logger.info('Current auth state:', { 
      hasUser: !!currentUser,
      user: currentUser
    });
  }, []);

  const testProfile = async () => {
    try {
      setError(null);
      logger.info('Testing profile API...');
      const result = await authApi.getProfile();
      setProfile(result);
      logger.info('Profile API success:', result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      logger.error('Profile API failed:', { error: errorMessage });
    }
  };

  const testLogin = async () => {
    try {
      setError(null);
      logger.info('Testing login...');
      const result = await authApi.login({
        email: 'test@example.com',
        password: 'password123'
      });
      authApi.saveAuthData(result);
      setUser(result.user);
      logger.info('Login success:', { userId: result.user.id });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      logger.error('Login failed:', { error: errorMessage });
    }
  };

  const testRegister = async () => {
    try {
      setError(null);
      logger.info('Testing register...');
      const result = await authApi.register({
        email: `test-${Date.now()}@example.com`,
        password: 'password123',
        name: 'Test User'
      });
      logger.info('Register success:', { userId: result.user.id });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      logger.error('Register failed:', { error: errorMessage });
    }
  };

  const clearAuth = () => {
    authApi.clearAuthData();
    setUser(null);
    setProfile(null);
    setError(null);
    logger.info('Auth data cleared');
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">API Test</h2>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Current State:</h3>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Actions:</h3>
        <div className="space-x-2">
          <button 
            onClick={testLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Login
          </button>
          <button 
            onClick={testRegister}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Test Register
          </button>
          <button 
            onClick={testProfile}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Profile
          </button>
          <button 
            onClick={clearAuth}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Auth
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {profile && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Profile Response:</h3>
          <div className="bg-green-100 p-4 rounded">
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
