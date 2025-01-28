"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from "next/navigation";

export default function DeleteProfilePage() {
  const [csrfToken, setCsrfToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch("http://localhost:8000/api/accounts/csrf-token/", {
        credentials: "include",
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/accounts/delete/", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      if (response.ok) {
        alert("Profile deleted.");
        router.push("/login");
      } else {
        alert("Error deleting profile.");
      }
    } catch {
      alert("Error deleting profile.");
    }
  };

  return (
    <ProtectedRoute>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Delete Profile</h1>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
    </ProtectedRoute>
  );
}