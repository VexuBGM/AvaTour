import axios from 'axios';
import React from 'react';

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
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}