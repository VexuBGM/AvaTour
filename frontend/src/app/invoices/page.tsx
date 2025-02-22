'use client';

import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import AddIcon from '../components/AddIcon';
import Link from 'next/link';

const Invoices = () => {
  return (
    //<ProtectedRoute>
    <div className="h-screen">
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <div className="bg-black w-11/12">
          <div className="bg-gradientdblue w-1/6 pt-5 rounded-lg flex flex-col justify-center items-center">
            <Link href="/create-invoice" className="flex justify-center items-center"><div className="bg-white hover:bg-slate-100 rounded-lg w-5/6 cursor-pointer">
              <AddIcon />
            </div></Link>
            <div className="mt-4 mb-2"><h1 className="mx-4 text-dddblue font-semibold text-xl">Добави</h1></div>
          </div>
        </div>


      </div>
    </div>
      
    //</ProtectedRoute>
  );
};

export default Invoices;