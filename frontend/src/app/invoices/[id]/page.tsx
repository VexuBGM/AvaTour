'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import NavbarMobile from '../../components/NavbarMobile';
import DeleteIcon from '../../components/DeleteIcon';

interface Payment {
  id: number;
  amount: number;
  payment_date: string;
  created_at: string;
}

interface Invoice {
  id: number;
  party_name: string;
  party_type: string;
  invoice_number: string;
  total_amount: number;
  date: string;
  payments: Payment[];
  remaining_amount: number;
  is_fully_paid: boolean;
  total_paid: number;
}

export default function InvoiceDetails() {
  const params = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [newPayment, setNewPayment] = useState({ amount: '', payment_date: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/invoices/${params.id}/`);
      setInvoice(response.data);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000/api/invoices/${params.id}/add_payment/`,
        newPayment
      );
      setNewPayment({ amount: '', payment_date: '' });
      fetchInvoice(); // Refresh invoice data
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Error adding payment');
    }
  };

  const handleDeletePayment = async (paymentId: number) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(
          `http://localhost:8000/api/invoices/${params.id}/payments/${paymentId}/`
        );
        fetchInvoice(); // Refresh invoice data
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  if (!invoice) return <div>Loading...</div>;

  return (
    <div className="h-screen">
      <div className="block sm:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden sm:block">
        <Navbar />
      </div>

      <div className="flex flex-col items-center pt-[7.5rem] pb-12 max-sm:pt-[8rem]">
        <div className="w-[90%] max-w-[800px] bg-gradientdblue rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-dddblue mb-4">
            Invoice #{invoice.invoice_number}
          </h1>
          
          <div className="mb-6">
            <p className="text-dddblue"><strong>Party:</strong> {invoice.party_name}</p>
            <p className="text-dddblue"><strong>Total Amount:</strong> {invoice.total_amount} лв.</p>
            <p className="text-dddblue"><strong>Remaining Amount:</strong> {invoice.remaining_amount} лв.</p>
            <p className="text-dddblue"><strong>Status:</strong> {invoice.is_fully_paid ? 'Fully Paid' : 'Pending'}</p>
          </div>

          {!invoice.is_fully_paid && (
            <form onSubmit={handleAddPayment} className="mb-6">
              <h2 className="text-xl font-bold text-dddblue mb-3">Add Payment</h2>
              {error && <div className="text-red-500 mb-3">{error}</div>}
              <div className="flex gap-4 mb-4">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="p-2 rounded"
                  required
                />
                <input
                  type="date"
                  value={newPayment.payment_date}
                  onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })}
                  className="p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-dblue text-white px-4 py-2 rounded hover:bg-opacity-90"
                >
                  Add Payment
                </button>
              </div>
            </form>
          )}

          <div>
            <h2 className="text-xl font-bold text-dddblue mb-3">Payment History</h2>
            <div className="bg-white rounded-lg px-4">
              {invoice.payments.length > 0 ? (
                invoice.payments.map((payment) => (
                  <div key={payment.id} className="border-b py-2 last:border-b-0 flex justify-between items-center">
                    <div>
                      <p className="text-dddblue">
                        <strong>Amount:</strong> {payment.amount} лв.
                      </p>
                      <p className="text-dddblue">
                        <strong>Date:</strong> {payment.payment_date}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeletePayment(payment.id)}
                      className="p-2 hover:bg-red-100 rounded-full w-24"
                      title="Delete Payment"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-dddblue">No payments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
