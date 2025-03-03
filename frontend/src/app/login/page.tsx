"use client";

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';
import OpenedEye from '../components/OpenedEye';
import ClosedEye from '../components/ClosedEye';
import CloseBtn from '../components/CloseBtn';
import { api } from '@/config/config';

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
        `${api}/accounts/session_login/`,
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.detail);
      if (response.status === 200) {
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.detail || 'An error occurred.');
      } else {
        setMessage('An error occurred.');
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-2/5 bg-lblue p-10 rounded-xl shadow-registerLoginCustom max-sm:w-[87%] max-sm:mt-[-20%] max-sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Потребителско име</h1></label>
            <input
              name="username"
              placeholder="Въведете Вашето потребителско име"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
              className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-2 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
            />
          </div>

          <div>
          <label className="block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Парола</h1></label>
          <div className="relative flex items-center">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Въведете Вашата парола"
              value={formData.password}
              onChange={handleChange}
              className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 pr-10 border-b-2 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
            />
              <div
                className="absolute right-3 cursor-pointer w-6 h-6 flex items-center justify-center"
                onClick={handleTogglePassword}
              >
                {showPassword ? <OpenedEye /> : <ClosedEye />}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-lightyellow shadow-registerLoginCustom hover:bg-slightlydarkeryellow w-4/5 rounded-xl cursor-pointer text-dyellow text-center font-semibold text-2xl px-5 py-2 select-none mt-6"
            >
              Вход
            </button>
          </div>

          <div className="select-none text-center flex justify-center space-x-1 text-base font-semibold opacity-80">
            <h1 className="text-dblue">Нямате профил?</h1>
            <a href="/register" className="text-ddblue hover:underline">Регистрация</a>
          </div>
        </form>
      </div>

      {message && (
        <div className="z-10 fixed top-6 bg-red-200 select-none w-3/5 py-3 flex justify-between items-center rounded-full max-sm:top-10 max-sm:w-[95%]">
          <h1 className="text-red-600 ml-5 font-semibold text-xl max-sm:text-lg">{message}</h1>
          <div 
            className="cursor-pointer rounded-full hover:bg-red-300 hover:bg-opacity-30 w-8 h-8 flex items-center justify-center mr-4"
            onClick={() => setMessage('')}
          >
            <CloseBtn />
          </div>
        </div>
      )}
    </div>
  );
}