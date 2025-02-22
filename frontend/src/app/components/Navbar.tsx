import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProfileIcon from './ProfileIcon';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');

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

  return (
    <nav className="flex justify-between items-center p-4 bg-lblue shadow-tcustom mb-14">
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
            <Link href="/deleteProfile" className="block px-4 py-2 text-ddblue hover:bg-lbluehover rounded-t-md font-semibold">
              Профил
            </Link>
            <Link href="/logout" className="block px-4 py-2 text-ddblue hover:bg-lbluehover rounded-b-md font-semibold">
              Изход
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;