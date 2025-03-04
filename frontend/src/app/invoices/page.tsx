'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import AddIcon from '../components/AddIcon';
import MoreInNewTabIcon from '../components/MoreInNewTabIcon';
import DeleteIcon from '../components/DeleteIcon';
import SearchIcon from '../components/SearchIcon';
import Link from 'next/link';
import { fetchInvoices } from '../../services/page';
import axios from 'axios';
import { api } from '@/config/config';

const Invoices = () => {
  interface Invoice {
    id: number;
    party_name: string;
    party_type: string;
    invoice_number: string;
    total_amount: number;
    date: string;
    is_fully_paid: boolean;  
  }

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInvoicesData = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoicesData();
  }, []);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.party_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${api}/invoices/${id}/`);
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const paidCardStyle = {
    background: 'linear-gradient(to bottom right, #427996, #427996)',
  };

  return (
    <ProtectedRoute>
    <div className="h-screen">
      <div className="block sm:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden sm:block">
        <Navbar />
      </div>

      <div className="flex flex-col justify-center items-center pt-[7.5rem] pb-12 max-sm:pt-[8rem]">
        {/* търсачка */}
        <div className="w-full flex justify-center items-center mb-14">
          <div className="relative flex items-center w-[40%] h-10 max-sm:w-[85%]">
            <input
              type="text"
              autoComplete="off"
              placeholder="Потърсете фактура"
              className="bg-llblue shadow-searchBarCustom rounded-full block w-full h-10 px-3 py-1 pr-12 text-base text-dblue placeholder:text-dblue placeholder:text-base outline-none focus:outline-dblue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-0 cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-lbluehover rounded-full p-1">
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* компютри */}
        <div className="w-[93%] flex flex-row flex-wrap gap-4 justify-start h-fit max-sm:hidden">
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-[1.35%] rounded-lg flex flex-col justify-between items-center">
            <Link href="/create-invoice" className="flex justify-center items-center">
              <div className="bg-white hover:bg-slate-100 rounded-lg w-5/6 cursor-pointer">
                <AddIcon />
              </div>
            </Link>
            <div className="mt-4 mb-2">
              <h1 className="text-dddblue font-semibold text-xl">Добави</h1>
            </div>
          </div>
          {filteredInvoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center"
              style={invoice.is_fully_paid ? paidCardStyle : {}}
            >
              <div className="mt-2 mb-2 w-full">
                <h1 className="text-dddblue font-semibold text-xl text-center">{invoice.party_type}</h1>
              </div>
              <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
                <div className="w-full flex gap-2">
                  <h1 className="text-dddblue font-semibold text-xl">Номер:</h1>
                  <span className="text-dddblue text-xl">{invoice.invoice_number}</span>
                </div>
                <div className="w-full flex gap-2">
                  <h1 className="text-dddblue font-semibold text-xl">Име:</h1>
                  <span className="text-dddblue text-xl">{invoice.party_name}</span>
                </div>
                <div className="w-full flex gap-2">
                  <h1 className="text-dddblue font-semibold text-xl">Сума:</h1>
                  <span className="text-dddblue text-xl">{invoice.total_amount} лв.</span>
                </div>
                <div className="w-full flex gap-2">
                  <h1 className="text-dddblue font-semibold text-xl">Дата:</h1>
                  <span className="text-dddblue text-xl">{invoice.date}</span>
                </div>
                {invoice.is_fully_paid && (
                  <div className="w-full flex justify-center mt-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                      ПЛАТЕНА
                    </span>
                  </div>
                )}
              </div>
              <div className="my-2 flex justify-end items-end w-full">
                <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване" onClick={() => handleDelete(invoice.id)}>
                  <DeleteIcon />
                </div>
                <Link href={`/invoices/${invoice.id}`} className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                  <MoreInNewTabIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* мобилни устройства */}
        <div className="w-full hidden flex-col gap-4 max-sm:flex">
          <div className="shadow-invoiceCustom bg-gradientdblue w-[50%] mx-auto pt-[5%] rounded-lg flex flex-col justify-between items-center">
            <Link href="/create-invoice" className="flex justify-center items-center">
              <div className="bg-white hover:bg-slate-100 rounded-lg w-5/6 cursor-pointer">
                <AddIcon />
              </div>
            </Link>
            <div className="mt-4 mb-2">
              <h1 className="text-dddblue font-semibold text-xl">Добави</h1>
            </div>
          </div>
          
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="w-[70%] mx-auto">
              <div 
                className="shadow-invoiceCustom bg-gradientdblue w-1/6 pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-[70%]"
                style={invoice.is_fully_paid ? paidCardStyle : {}}
              >
                <div className="mt-2 mb-2 w-full">
                  <h1 className="text-dddblue font-semibold text-xl text-center">{invoice.party_type}</h1>
                </div>
                <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col justify-center items-center w-full gap-1">
                  <div className="w-full flex gap-2">
                    <h1 className="text-dddblue font-semibold text-xl">Номер:</h1>
                    <span className="text-dddblue text-xl">{invoice.invoice_number}</span>
                  </div>
                  <div className="w-full flex gap-2">
                    <h1 className="text-dddblue font-semibold text-xl">Име:</h1>
                    <span className="text-dddblue text-xl">{invoice.party_name}</span>
                  </div>
                  <div className="w-full flex gap-2">
                    <h1 className="text-dddblue font-semibold text-xl">Сума:</h1>
                    <span className="text-dddblue text-xl">{invoice.total_amount} лв.</span>
                  </div>
                  <div className="w-full flex gap-2">
                    <h1 className="text-dddblue font-semibold text-xl">Дата:</h1>
                    <span className="text-dddblue text-xl">{invoice.date}</span>
                  </div>
                  {invoice.is_fully_paid && (
                    <div className="w-full flex justify-center mt-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        ПЛАТЕНА
                      </span>
                    </div>
                  )}
                </div>
                <div className="my-2 flex justify-end items-end w-full">
                  <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване" onClick={() => handleDelete(invoice.id)}>
                    <DeleteIcon />
                  </div>
                  <Link href={`/invoices/${invoice.id}`} className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                    <MoreInNewTabIcon />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Invoices;