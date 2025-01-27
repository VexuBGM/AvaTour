'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';

const ProtectedPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/accounts/check_auth/', {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          setError('Access denied. Please log in.');
        } else {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ProtectedRoute>
      <Navbar username={username} />
      <div>
        <h1>Welcome</h1>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedPage;