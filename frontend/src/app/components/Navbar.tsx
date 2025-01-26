import React from 'react';

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
      <div className="flex items-center">
        <span>{username}</span>
      </div>
    </nav>
  );
};

export default Navbar;