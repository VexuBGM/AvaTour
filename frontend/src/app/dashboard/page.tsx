'use client';

import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';

const Dashboard = () => {
  return (
    //<ProtectedRoute>
    <div className="h-screen">

      <div className="block sm:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden sm:block">
        <Navbar />
      </div>
      
      <div className="flex flex-col gap-20 items-center justify-center pb-16">
        <div className="flex items-center justify-center bg-dashboard w-2/3 h-[66vh] rounded-lg shadow-dashboard">
          <h1>Някаква диаграма</h1>
        </div>
        <div className="flex items-center justify-center bg-dashboard w-2/3 h-[33vh] rounded-lg shadow-dashboard">
          <h1>Последните 3 фактури ще бъдат тук</h1>
        </div>
      </div>
    </div>
    //</ProtectedRoute>
  );
};

export default Dashboard;