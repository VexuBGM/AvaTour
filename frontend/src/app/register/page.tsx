'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../globals.css';
import OpenedEye from '../components/OpenedEye';
import ClosedEye from '../components/ClosedEye';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
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
      const response = await axios.post('http://localhost:8000/api/accounts/register/', formData);
      setSuccessMessage('Registration successful!');
      // Perform login immediately after registration
      const loginResponse = await axios.post(
        'http://localhost:8000/api/accounts/session_login/',
        { username: formData.username, password: formData.password },
        { withCredentials: true }
      );
      console.log(loginResponse.data);
      router.push('/dashboard');
    } catch (error) {
      setErrorMessage('Registration failed.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-2/5 bg-lblue p-8 rounded-xl shadow-registerLoginCustom">
        {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Потребителско име</h1></label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
              placeholder="username here"
              className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
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
              placeholder="email here"
              className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
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
                placeholder="password here"
                className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 pr-10 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
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
              Регистриране
            </button>
          </div>

          <div className="select-none text-center flex justify-center space-x-1 text-base font-semibold opacity-80">
            <h1 className="text-dblue">Имате профил?</h1>
            <a href="/login" className="text-ddblue hover:underline">Вход</a>
          </div>
        </form>
      </div>
    </div>
  );
}