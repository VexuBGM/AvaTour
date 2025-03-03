'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../globals.css';
import OpenedEye from '../components/OpenedEye';
import ClosedEye from '../components/ClosedEye';
import CloseBtn from '../components/CloseBtn';
import { api } from '@/config/config';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://167.172.160.212:8000/api/accounts/register/`, formData);
      const loginResponse = await axios.post(
        `${api}/accounts/session_login/`,
        { username: formData.username, password: formData.password },
        { withCredentials: true }
      );
      console.log(loginResponse.data);
      router.push('/dashboard');
    } catch {
      setErrorMessage('Registration failed.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-2/5 bg-lblue p-8 rounded-xl shadow-registerLoginCustom max-sm:w-[85%] max-sm:mt-[-20%] max-sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 max-sm:space-y-6">
          <div>
            <label className="block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Потребителско име</h1></label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
              placeholder="Въведете потребителско име"
              className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-2 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
            />
          </div>

          <div>
            <label className="block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Email</h1></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Въведете своя имейл адрес"
              className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-2 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
            />
          </div>

          <div>
            <label className="block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Парола</h1></label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Въведете парола"
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
              className="bg-lightyellow shadow-registerLoginCustom hover:bg-slightlydarkeryellow w-4/5 rounded-xl cursor-pointer text-dyellow text-center font-semibold text-2xl px-5 py-2 select-none mt-6 max-sm:w-[90%]"
            >
              Регистриране
            </button>
          </div>

          <div className="select-none text-center flex justify-center space-x-1 text-base font-semibold opacity-80">
            <h1 className="text-dblue">Имате профил?</h1>
            <a href="/login" className="text-ddblue hover:underline">Вход</a>
          </div>
        </form>
      </div>

      {errorMessage && (
        <div className="z-10 fixed top-6 bg-red-200 select-none w-3/5 py-3 flex justify-between items-center rounded-full max-sm:top-10 max-sm:w-[95%]">
          <h1 className="text-red-600 ml-5 font-semibold text-xl max-sm:text-lg">{errorMessage}</h1>
          <div 
            className="cursor-pointer rounded-full hover:bg-red-300 hover:bg-opacity-30 w-8 h-8 flex items-center justify-center mr-4"
            onClick={() => setErrorMessage('')}
          >
            <CloseBtn />
          </div>
        </div>
      )}
    </div>
  );
}