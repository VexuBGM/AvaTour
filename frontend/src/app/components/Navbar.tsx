import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="flex justify-between p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex gap-4">
        <span>Tab 1</span>
        <span>Tab 2</span>
      </div>
      <Link href="/logout">
      <div className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition-colors">
        <span>Logout /</span>
        <span className="px-1">{username}</span>
        
      </div>
      </Link>
    </nav>
  );
};

export default Navbar;