import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ProfileIcon from './ProfileIcon';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/accounts/check_auth/', {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const csrfToken = getCookie('csrftoken');
      await axios.post(
        'http://localhost:8000/api/accounts/session_logout/',
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <>
      <nav className="z-50 w-full fixed flex justify-between items-center p-4 bg-lblue shadow-tcustom">
        <div className="w-12 flex items-center">
          <img className="select-none" src="/images/logo.png" draggable="false" />
          <h1 className="mt-2 ml-2 text-lg font-semibold text-logodblue select-none">AvaTour</h1>
        </div>
        <div className="flex-1 flex justify-center gap-10">
          <Link href="/dashboard"><h1 className="text-lg font-semibold text-ddblue hover:text-dddblue duration-150 cursor-pointer">Начало</h1></Link>
          <Link href="/invoices"><h1 className="text-lg font-semibold text-ddblue hover:text-dddblue duration-150 cursor-pointer">Фактури</h1></Link>
          <Link href="/create-invoice"><h1 className="text-lg font-semibold text-ddblue hover:text-dddblue duration-150 cursor-pointer">Добави фактура</h1></Link>
        </div>
        <div className="relative">
          <div
            className="w-11 h-11 flex  items-center bg-dblue rounded-full cursor-pointer hover:bg-ddblue transition-colors"
            onClick={toggleDropdown}
          >
            <ProfileIcon />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-llblue rounded-md shadow-lg">
              <Link href="/profile-settings" className="block px-4 py-2 text-ddblue hover:bg-lbluehover rounded-t-md font-semibold">
                Профил
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full text-left px-4 py-2 text-ddblue hover:bg-lbluehover rounded-b-md font-semibold"
              >
                Изход
              </button>
            </div>
          )}
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold text-ddblue mb-4">Потвърждение за изход</h2>
            <p className="text-gray-600 mb-6">Сигурни ли сте, че искате да излезете?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-semibold"
              >
                Отказ
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-semibold"
              >
                Изход
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;