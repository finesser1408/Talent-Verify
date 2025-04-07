import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await auth.login(username, password);
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };

  return {
    login,
    logout,
    isAuthenticated,
    loading,
    error,
  };
}; 