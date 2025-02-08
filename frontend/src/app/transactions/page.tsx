'use client'

import { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  transaction_type: 'client' | 'supplier';
  name: string;
  date: string;
  sum: number; 
}

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/transactions/api/transactions/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Your Transactions</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Sum</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="text-center">
              <td className="py-2 px-4 border">{tx.transaction_type}</td>
              <td className="py-2 px-4 border">{tx.name}</td>
              <td className="py-2 px-4 border">{tx.date}</td>
              <td className="py-2 px-4 border">{tx.sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
