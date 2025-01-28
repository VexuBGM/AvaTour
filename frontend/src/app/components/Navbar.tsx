import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex gap-4">
        <span>Tab 1</span>
        <span>Tab 2</span>
      </div>
      <div className="relative">
        <div
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
          onClick={toggleDropdown}
        >
          <span className="px-1">{username}</span>
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