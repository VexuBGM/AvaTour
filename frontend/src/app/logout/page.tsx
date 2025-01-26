'use client';

import axios from 'axios';
import React from 'react';
import '../globals.css';

export default function Logout() {
  const handleLogout = async () => {
    try {
      const csrfToken = getCookie('csrftoken'); // Function to get CSRF token from cookies
      await axios.post(
        'http://localhost:8000/api/accounts/session_logout/',
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      alert('Logout successful!');
    } catch (error) {
      console.error(error);
      alert('Logout failed.');
    }
  };

  // Function to get CSRF token from cookies
  const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Logout</h1>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}