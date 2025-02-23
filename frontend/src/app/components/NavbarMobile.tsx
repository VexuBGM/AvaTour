import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProfileIcon from './ProfileIcon';

const NavbarMobile: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false); //navbar open
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

  //btn set clicked
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav className="fixed w-full flex justify-between items-center p-4 bg-lblue shadow-tcustom">
      <div className="w-12 flex items-center">
        <img className="select-none" src="/images/logo.png" draggable="false" />
        <h1 className="mt-2 ml-2 text-lg font-semibold text-logodblue select-none">AvaTour</h1>
      </div>
      <div className={`z-20 absolute left-[85%] flex flex-col justify-between transform transition-all ease-in-out duration-300 ${isClicked ? '-translate-x-[80vw]' : ''}`} onClick={handleClick}>
        <div className={`bg-logodblue px-[1.2rem] py-[0.1rem] transform transition-all duration-300 ${isClicked ? '-rotate-45 px-[0.7rem]' : ''}`}></div>
        <div className={`bg-logodblue px-[1.2rem] py-[0.1rem] my-[0.6rem] transition-all duration-150 ${isClicked ? 'bg-transparent px-[0.7rem] my-[0.25rem]' : ''}`}></div>
        <div className={`bg-logodblue px-[1.2rem] py-[0.1rem] transform transition-all duration-300 ${isClicked ? 'rotate-45 px-[0.7rem]' : ''}`}></div>
      </div>

      <div className={`fixed top-0 left-0 w-full h-full bg-lblue z-10 transform transition-all duration-300 ${isClicked ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="relative w-12 flex items-center mt-3 float-right right-[23%]">
          <h1 className="mt-2 mr-2 text-lg font-semibold text-logodblue select-none">AvaTour</h1>
          <img className="select-none" src="/images/logo.png" draggable="false" />
        </div>

        <div className="flex flex-col items-center justify-center mt-[19%] w-full">
          <Link href="/dashboard" className="w-full">
            <div className="border-t-2 border-dashed border-llblue py-8">
              <h1 className="text-center text-lg font-semibold text-ddblue">Начало</h1>
            </div>
          </Link>
          <Link href="/invoices" className="w-full">
            <div className="border-y-2 border-dashed border-llblue py-8">
              <h1 className="text-center text-lg font-semibold text-ddblue">Фактури</h1>
            </div>
          </Link>
          <Link href="/create-invoice" className="w-full">
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
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-llblue rounded-md shadow-lg transform transition-all duration-300">
              <Link href="/profile-settings" className="block px-4 py-2 text-ddblue hover:bg-lbluehover rounded-t-md font-semibold">
                Профил
              </Link>
              <Link href="/" className="block px-4 py-2 text-ddblue hover:bg-lbluehover rounded-b-md font-semibold">
                Изход
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default NavbarMobile;