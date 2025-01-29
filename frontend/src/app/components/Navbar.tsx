import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

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
    <nav className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex-1 flex justify-center gap-10">
        <Link href="/"><span className="text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">Home</span></Link>
        <Link href="/dashboard"><span className="text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">Dashboard</span></Link>
      </div>
      <div className="relative">
        <div
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
          onClick={toggleDropdown}
        >
          <span className="px-1 select-none">{username}</span>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
            <Link href="/deleteProfile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Profile
            </Link>
            <Link href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;