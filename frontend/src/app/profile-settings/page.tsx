'use client';

import { useState, useEffect } from "react";
import '../globals.css';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import OpenedEye from '../components/OpenedEye';
import ClosedEye from '../components/ClosedEye';
import EditIcon from '../components/EditIcon';
import axios from 'axios';

type EditableField = "username" | "email" | "password";

export default function ProfileSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await axios.get('http://localhost:8000/api/accounts/csrf-token/', { withCredentials: true });
      setCsrfToken(response.data.csrfToken);
    };
    fetchCsrfToken();
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEdit = (field: EditableField) => {
    setEditingField(field);
    setTimeout(() => {
      document.getElementById(field)?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const updatedData: Partial<typeof formData> = {};
      if (formData.username) updatedData.username = formData.username;
      if (formData.email) updatedData.email = formData.email;
      if (formData.password) updatedData.password = formData.password;

      const response = await axios.put('http://localhost:8000/api/accounts/update/', updatedData, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/accounts/delete/', {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("Profile deleted successfully!");
        window.location.href = "/login";
      } else {
        alert("Failed to delete profile.");
      }
    } catch (error) {
      alert("Failed to delete profile.");
    }
  };

  return (
    <div className="h-screen">
      <div className="block sm:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden sm:block">
        <Navbar />
      </div>

      <div className="pt-[8rem] pb-[3rem] max-sm:pt-[9rem]">
        <div className="w-[35rem] bg-llblue p-8 rounded-xl shadow-lg mx-auto max-sm:w-[90%] max-sm:p-6">
          <label className="block text-ddblue font-bold text-2xl mb-1">
            <h1 className="cursor-text w-fit">Потребителско име</h1>
          </label>
          <div className="relative flex items-center">
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Въведете ново потребителско име"
              className={`bg-llblue rounded-t-md block w-full px-2 pt-2 pr-10 border-b-2 border-dblue text-base text-dblue placeholder:text-dblue placeholder:text-base outline-none ${editingField === "username" ? "focus:border-transparent focus:rounded-b-md focus:bg-white" : ""}`}
              readOnly={editingField !== "username"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={formData.username}
            />
            <button
              className="absolute right-2 cursor-pointer w-6 h-6 flex items-center justify-center"
              onClick={() => handleEdit("username")}
            >
              <EditIcon />
            </button>
          </div>

          <label className="mt-8 block text-ddblue font-bold text-2xl mb-1">
            <h1 className="cursor-text w-fit">Email</h1>
          </label>
          <div className="relative flex items-center">
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Въведете нов имейл адрес"
              className={`bg-llblue rounded-t-md block w-full px-2 pt-2 pr-10 border-b-2 border-dblue text-base text-dblue placeholder:text-dblue placeholder:text-base outline-none ${editingField === "email" ? "focus:border-transparent focus:rounded-b-md focus:bg-white" : ""}`}
              readOnly={editingField !== "email"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={formData.email}
            />
            <button
              className="absolute right-2 cursor-pointer w-6 h-6 flex items-center justify-center"
              onClick={() => handleEdit("email")}
            >
              <EditIcon />
            </button>
          </div>
          <label className="mt-8 block text-ddblue font-bold text-2xl mb-1">
            <h1 className="cursor-text w-fit">Парола</h1>
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Въведете нова парола"
              className={`bg-llblue rounded-t-md block w-full px-2 pt-2 pr-16 border-b-2 border-dblue text-base text-dblue placeholder:text-dblue placeholder:text-base outline-none ${editingField === "password" ? "focus:border-transparent focus:rounded-b-md focus:bg-white" : ""}`}
              readOnly={editingField !== "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={formData.password}
            />
            <div className="absolute right-2 flex items-center gap-x-2">
              <button
                className="w-6 h-6 flex items-center justify-center"
                onClick={handleTogglePassword}
              >
                {showPassword ? <OpenedEye /> : <ClosedEye />}
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center"
                onClick={() => handleEdit("password")}
              >
                <EditIcon />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center mt-[2rem] items-center gap-[1rem]">
            <button
              type="button"
              className="bg-lightyellow shadow-mobileBtnCustom hover:bg-slightlydarkeryellow w-[19rem] rounded-xl cursor-pointer text-dyellow text-center font-semibold text-xl px-5 py-2 select-none max-sm:w-[100%]"
              onClick={handleSubmit}
            >
              Запазване на промените
            </button>

            <button
              type="button"
              className="bg-lightyellow shadow-mobileBtnCustom hover:bg-slightlydarkeryellow w-[20rem] rounded-xl cursor-pointer text-dyellow text-center font-semibold text-xl px-5 py-2 select-none max-sm:w-[100%]"
              onClick={() => setFormData({ username: "", email: "", password: "" })}
            >
              Отхвърляне на промените
            </button>

            <button
              type="button"
              className="bg-red-600 shadow-mobileBtnCustom hover:bg-red-700 w-[20rem] rounded-xl cursor-pointer text-white text-center font-semibold text-xl px-5 py-2 select-none max-sm:w-[100%]"
              onClick={handleDelete}
            >
              Изтриване на профила
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}