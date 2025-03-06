"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ReactNode } from 'react';
import { api } from '@/config/config';

axios.defaults.withCredentials = true;

// Add request interceptor to set CSRF token
axios.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken');  // Function to get csrf token from cookies

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;  // Set CSRF token in the header
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

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