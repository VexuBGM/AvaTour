"use client";

import { useState, useEffect } from 'react';
import '../app/globals.css';
import Link from 'next/link';
import ArrowIcon from './components/ArrowIcon';
import TopArrowIcon from './components/TopArrowIcon';

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopArrow, setShowTopArrow] = useState(false);

  const handleArrowClick = (): void => {
    setClicked(true);
    
    const descriptionElement = document.getElementById('description');
    if (descriptionElement) {
      descriptionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTopArrowClick = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowTopArrow(false);
      } else {
        setShowTopArrow(true);
      }

      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
        if (clicked) {
          setClicked(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [clicked]);

  return (
    <div className="h-screen">
      <title>AvaTour</title>

      <div className="h-full">
        <img className="w-planet" src="/images/landing-page-planet.png" draggable="false" />
        <img className="w-chart absolute bottom-0 right-0" src="/images/landing-page-chart.png" draggable="false" />
      </div>

      <div className="z-20 top-5 w-full absolute">
        <div className="w-fit relative" style={{ left: 'var(--title-left)' }}>
          <h1 className="text-dblue text-center text-9xl font-extrabold">AvaTour</h1>
          <h1 className="text-dyellow text-center text-2xl font-semibold italic">
            Вашият фокус е туризмът,<br />
            нашият – отчетността!
          </h1>
        </div>
      </div>
      <div className="z-30 h-1/3 w-full top-64 absolute">
        <div className="left-56 bottom-0 h-36 w-fit absolute flex flex-col justify-between">
          <Link href="/login">
            <div className="bg-lightyellow hover:bg-slightlydarkeryellow hover:shadow-none hover:translate-x-xbtn hover:translate-y-ybtn shadow-ycustom w-full rounded-xl cursor-pointer">
              <h1 className="text-dyellow text-center font-semibold text-4xl py-2 select-none">Вход</h1>
            </div>
          </Link>
          <Link href="/register">
            <div className="bg-lightyellow hover:bg-slightlydarkeryellow hover:shadow-none hover:translate-x-xbtn hover:translate-y-ybtn shadow-ycustom w-full rounded-xl cursor-pointer">
              <h1 className="text-dyellow text-center font-semibold text-4xl px-5 py-2 select-none">Регистрация</h1>
            </div>
          </Link>
        </div>
      </div>

      <div
        className={`bg-gradient-to-t from-black to-transparent opacity-0 w-full h-36 z-10 absolute bottom-0 flex items-end justify-center transition-opacity duration-500 ${clicked || scrolled ? 'opacity-0 pointer-events-none' : 'opacity-90'}`}
      >
        <div
          onClick={handleArrowClick}
          className={`cursor-pointer flex justify-center items-center animate-bounce w-24 h-1/2 transition-opacity duration-500 ${clicked || scrolled ? 'opacity-0 pointer-events-none' : 'opacity-90'}`}
        >
          <ArrowIcon />
        </div>
      </div>

      <div id="description" className="flex justify-center items-center h-screen">
        <div className="bg-gradient-to-b from-gradientdblue to-gradientlblue w-2/5 h-2/3 rounded-2xl">
          <h1 className="mt-7 text-center text-ddblue text-5xl font-extrabold">Какво е AvaTour?</h1>
          <h1 className="mt-10 text-center text-descblue text-2xl font-extrabold">description</h1>
        </div>
      </div>

      <div
        className={`z-10 flex justify-end fixed bottom-0 w-full mb-2 animate-bounce transition-opacity duration-500 ${
          showTopArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div onClick={handleTopArrowClick} className="bg-dblue hover:bg-ddblue w-20 mr-5 rounded-full shadow-tcustom cursor-pointer">
          <TopArrowIcon />
        </div>
      </div>
    </div>
  );
}