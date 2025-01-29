'use client';

import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <div>
        <h1>Welcome</h1>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;