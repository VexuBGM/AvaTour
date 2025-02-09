"use client";

import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  transaction_type: "client" | "supplier";
  name: string;
  date: string;
  sum: string;
}

// Utility function to get a named cookie
function getCookie(name: string): string | null {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookieValue ? cookieValue.split("=")[1] : null;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("http://localhost:8000/transactions/api/transactions/", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setTransactions(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }
    const csrfToken = getCookie("csrftoken");

    try {
      const res = await fetch(`http://localhost:8000/transactions/api/transactions/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken || "",
        },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      // Remove the deleted transaction from state
      setTransactions(transactions.filter(tx => tx.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete the transaction.");
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Loading transactions...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Transactions</h1>
      {transactions.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Sum</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{tx.transaction_type}</td>
                <td className="py-2 px-4 border-b">{tx.name}</td>
                <td className="py-2 px-4 border-b text-center">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b text-right">${tx.sum}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => handleDelete(tx.id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}