import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ProfileIcon from './ProfileIcon';
import { api } from '@/config/config';
import Image from 'next/image';

const NavbarMobile: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get(`${api}/accounts/check_auth/`, {
          withCredentials: true,
        });
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
        `${api}/accounts/session_logout/`,
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
      <nav className="z-50 fixed w-full flex justify-between items-center p-4 bg-lblue shadow-tcustom">
        <div className="w-12 flex items-center">
          <Image className="select-none" src="/images/logo.png" alt="AvaTour Logo" width={48} height={48} draggable="false" />
          <h1 className="mt-2 ml-2 text-lg font-semibold text-logodblue select-none">AvaTour</h1>
        </div>
        <div
          className={`z-20 absolute flex flex-col justify-center items-center h-[70%] w-fit cursor-pointer transform transition-all duration-300 ${
            isClicked ? 'left-[2%]' : 'left-[85%]'
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          <div className={`bg-logodblue h-[0.18rem] w-[2.4rem] transform transition-all duration-300 ${isClicked ? 'rotate-[-45deg] w-[65%]' : ''}`} />
          <div className={`bg-logodblue h-[0.18rem] w-[2.4rem] transition-opacity duration-200 ${isClicked ? 'opacity-0 my-[0.35rem]' : 'opacity-100 my-[0.6rem]'}`} />
          <div className={`bg-logodblue h-[0.18rem] w-[2.4rem] transform transition-all duration-300 ${isClicked ? 'rotate-[45deg] w-[65%]' : ''}`} />
        </div>

        <div className={`fixed top-0 left-0 w-full h-full bg-lblue z-10 transform transition-all duration-300 ${isClicked ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="relative w-12 flex items-center mt-3 float-right right-[23%]">
            <h1 className="mt-2 mr-2 text-lg font-semibold text-logodblue select-none">AvaTour</h1>
            <Image className="select-none" src="/images/logo.png" alt="AvaTour Logo" width={48} height={48} draggable="false" />
          </div>

          <div className="flex flex-col items-center justify-center mt-[19%] w-full">
            <Link href="/dashboard" className="w-full" onClick={() => setIsClicked(false)}>
              <div className="border-t-2 border-dashed border-llblue py-8">
                <h1 className="text-center text-lg font-semibold text-ddblue">Начало</h1>
              </div>
            </Link>
            <Link href="/invoices" className="w-full" onClick={() => setIsClicked(false)}>
              <div className="border-y-2 border-dashed border-llblue py-8">
                <h1 className="text-center text-lg font-semibold text-ddblue">Фактури</h1>
              </div>
            </Link>
            <Link href="/create-invoice" className="w-full" onClick={() => setIsClicked(false)}>
              <div className="border-b-2 border-dashed border-llblue py-8">
                <h1 className="text-center text-lg font-semibold text-ddblue">Добави фактура</h1>
              </div>
            </Link>
          </div>

          <div className="fixed bottom-4 right-4">
            <div
              className="w-11 h-11 flex items-center bg-dblue rounded-full cursor-pointer hover:bg-ddblue transition-colors"
              onClick={toggleDropdown}
            >
              <ProfileIcon />
            </div>
            {dropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-llblue rounded-md shadow-lg">
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
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 w-[90%] mx-4 max-w-sm shadow-lg">
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

export default NavbarMobile;