import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../api/api';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [adminSession, setAdminSession] = useState(null);
  const queryClient = useQueryClient();

  const value = useMemo(() => ({
    isAdmin: adminSession?.role === 'ADMIN',
    token: adminSession?.token ?? null,
    isDevLogin: Boolean(adminSession?.isDevLogin),
    login: async (username, password) => {
      if (
        import.meta.env.DEV &&
        username === import.meta.env.VITE_DEV_ADMIN_USERNAME || 'Admin' &&
        password === import.meta.env.VITE_DEV_ADMIN_PASSWORD || 'admin123'
      ) {
        setAdminSession({ role: 'ADMIN', isDevLogin: true });
        return;
      }

      const { data } = await axiosInstance.post('/api/middleware/login', {
        username,
        password,
      });

      if (typeof data?.token !== 'string' || !data.token || typeof data?.role !== 'string') {
        throw new Error('Login response is missing an admin role or access token.');
      }

      if (data.role.toUpperCase() !== 'ADMIN') {
        throw new Error('This account does not have admin access.');
      }

      setAdminSession({ token: data.token, role: 'ADMIN', isDevLogin: false });
    },
    logout: () => {
      queryClient.removeQueries({ queryKey: ['middleware', 'responses'] });
      setAdminSession(null);
    },
  }), [adminSession, queryClient]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
