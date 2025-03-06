'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import Link from 'next/link';
import { api } from '@/config/config';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Invoice {
  id: number;
  party_name: string;
  party_type: string;
  invoice_number: string;
  total_amount: number;
  date: string;
  is_fully_paid: boolean;
  total_paid: number;
  remaining_amount: number;
}

const Dashboard = () => {
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalPaidToClients, setTotalPaidToClients] = useState(0);
  const [totalPaidToSuppliers, setTotalPaidToSuppliers] = useState(0);
  const [monthlyPayments, setMonthlyPayments] = useState<{ month: string, clients: number, suppliers: number }[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(`${api}/invoices/`);
        const invoices: Invoice[] = response.data;
        
        let paid = 0;
        let unpaid = 0;
        let paidToClients = 0;
        let paidToSuppliers = 0;
        const monthlyData: { [key: string]: { clients: number, suppliers: number } } = {};
        
        invoices.forEach((invoice) => {
          paid += Number(invoice.total_paid);
          unpaid += Number(invoice.remaining_amount);
          const month = new Date(invoice.date).toLocaleString('default', { month: 'long' });
          if (!monthlyData[month]) {
            monthlyData[month] = { clients: 0, suppliers: 0 };
          }
          if (invoice.party_type === 'client') {
            paidToClients += Number(invoice.total_paid);
            monthlyData[month].clients += Number(invoice.total_paid);
          } else if (invoice.party_type === 'supplier') {
            paidToSuppliers += Number(invoice.total_paid);
            monthlyData[month].suppliers += Number(invoice.total_paid);
          }
        });

        const sortedInvoices = [...invoices].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 3);

        setTotalPaid(paid);
        setTotalUnpaid(unpaid);
        setTotalPaidToClients(paidToClients);
        setTotalPaidToSuppliers(paidToSuppliers);
        setMonthlyPayments(Object.keys(monthlyData).map(month => ({
          month,
          clients: monthlyData[month].clients,
          suppliers: monthlyData[month].suppliers
        })).sort((a, b) => new Date(`1 ${a.month} 2021`).getTime() - new Date(`1 ${b.month} 2021`).getTime()));
        setRecentInvoices(sortedInvoices);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, []);

  const netBalance = totalPaidToClients - totalPaidToSuppliers;

  const chartDataPaidVsUnpaid = {
    labels: ['Платени', 'Неплатени'],
    datasets: [
      {
        data: [totalPaid, totalUnpaid],
        backgroundColor: ['#4CAF50', '#FF5252'],
        borderColor: ['#43A047', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  const chartDataClientsVsSuppliers = {
    labels: monthlyPayments.map(data => data.month),
    datasets: [
      {
        label: 'Платени на клиенти',
        data: monthlyPayments.map(data => data.clients),
        backgroundColor: '#4CAF50',
        borderColor: '#43A047',
        borderWidth: 1,
      },
      {
        label: 'Платени на доставчици',
        data: monthlyPayments.map(data => data.suppliers),
        backgroundColor: '#FF5252',
        borderColor: '#D32F2F',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
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
        
        <div className="pt-[8.5rem] flex flex-col gap-20 items-center justify-center pb-16">
          <div className="flex flex-col items-center justify-center bg-dashboard w-[66%] h-[66vh] rounded-lg shadow-dashboard max-sm:w-[85%] max-sm:h-[50vh] p-6">
            <h2 className="text-2xl font-semibold mb-4">Статистика на плащанията</h2>
            <div className="w-[80%] h-[80%] flex items-center justify-center max-sm:w-full max-sm:h-[50%]">
              <Pie data={chartDataPaidVsUnpaid} options={options} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">Общо платени: <span className="font-semibold">{totalPaid.toFixed(2)} лв.</span></p>
              <p className="text-lg font-medium">Общо неплатени: <span className="font-semibold">{totalUnpaid.toFixed(2)} лв.</span></p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-dashboard w-[66%] h-[66vh] rounded-lg shadow-dashboard max-sm:w-[85%] max-sm:h-[50vh] p-6">
            <h2 className="text-2xl font-semibold mb-4">Платени на клиенти и доставчици по месеци</h2>
            <div className="w-[80%] h-[80%] flex items-center justify-center max-sm:w-full max-sm:h-[50%]">
              <Bar data={chartDataClientsVsSuppliers} options={options} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">Общо платени на клиенти: <span className="font-semibold">{totalPaidToClients.toFixed(2)} лв.</span></p>
              <p className="text-lg font-medium">Общо платени на доставчици: <span className="font-semibold">{totalPaidToSuppliers.toFixed(2)} лв.</span></p>
              <p className="text-lg font-medium">Нетен баланс: <span className="font-semibold">{netBalance.toFixed(2)} лв.</span></p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-dashboard w-[66%] h-fit rounded-lg shadow-dashboard max-sm:w-[85%] py-6">
            <h2 className="text-2xl font-semibold mb-6">Последни фактури</h2>
            <div className="w-full px-8 flex flex-col gap-4">
              {recentInvoices.map((invoice) => (
                <Link href={`/invoices/${invoice.id}`} key={invoice.id}>
                  <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">{invoice.party_name}</p>
                        <p className="text-sm text-gray-600">№ {invoice.invoice_number}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{invoice.total_amount} лв.</p>
                        <p className="text-sm text-gray-600">{invoice.date}</p>
                      </div>
                      {invoice.is_fully_paid && (
                        <span className="ml-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                          ПЛАТЕНА
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;