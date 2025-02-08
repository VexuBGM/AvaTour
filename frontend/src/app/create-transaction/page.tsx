"use client";

import { useState } from "react";
import { createTransaction } from "../../utils/api";

export default function CreateTransactionForm() {
  const [transactionType, setTransactionType] = useState<"client" | "supplier">("client");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [sum, setSum] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createTransaction({
        transaction_type: transactionType,
        name,
        date,
        sum: parseFloat(sum),
      });
      setSuccess(true);
      setName("");
      setDate("");
      setSum("");
    } catch (err) {
      setError("Failed to create transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">Create Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex border border-gray-300 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setTransactionType("client")}
            className={`px-4 py-2 rounded-lg transition ${
              transactionType === "client" ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`}
          >
            Client
          </button>
          <button
            type="button"
            onClick={() => setTransactionType("supplier")}
            className={`px-4 py-2 rounded-lg transition ${
              transactionType === "supplier" ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`}
          >
            Supplier
          </button>
        </div>

        <div>
          <label className="block">Name</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Date</label>
          <input
            type="date"
            className="mt-1 p-2 border rounded w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Sum</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="mt-1 p-2 border rounded w-full"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Transaction created successfully!</p>}
    </div>
  );
}
