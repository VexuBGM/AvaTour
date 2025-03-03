"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ReactNode } from 'react';
import { api } from '@/config/config';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${api}/accounts/check_auth/`, { withCredentials: true });
        console.log('Auth check response:', response);
        if (response.status === 200 && response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // or a redirect to login page
  }

  return <>{children}</>;
};

export default ProtectedRoute;