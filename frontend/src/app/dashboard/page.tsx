'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';

const ProtectedPage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/accounts/check_auth/', {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

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