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
        const response = await axios.post(`${api}/accounts/check_auth/`);
        console.log(response);
        if (response.status === 200 && response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;