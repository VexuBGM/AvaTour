"use client";

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/accounts/session_login/',
        formData,
        {
          withCredentials: true, // Important to send/receive cookies
        }
      );
      setMessage(response.data.detail);
      if (response.status === 200) {
        router.push('/dashboard');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'An error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleTogglePassword}
                className="form-checkbox"
              />
              <span className="ml-2 select-none">Show Password</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
        <div className="mt-4 text-center">
          <span className="text-gray-700">Don't have an account? </span>
          <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
}