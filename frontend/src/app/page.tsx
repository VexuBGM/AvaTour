"use client";

import { useState, useEffect } from 'react';
import '../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
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
        setScrolled(false);
        setShowTopArrow(false);
        setClicked(false);
      } else {
        setScrolled(true);
        setShowTopArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradientOpacityClass = clicked || scrolled ? 'opacity-0 pointer-events-none' : 'opacity-90';

  return (
    <div className="h-screen">
      <title>AvaTour</title>

      <div className="h-full">
        <Image className="w-planet max-sm:hidden" src="/images/landing-page-planet.png" alt="Landing Page Planet" width={500} height={500} draggable="false" />
        <Image className="w-chart absolute bottom-0 right-0 max-sm:w-full max-sm:fixed" src="/images/landing-page-chart.png" alt="Landing Page Chart" width={500} height={500} draggable="false" />
      </div>

      <div className="z-20 top-[1%] w-full absolute max-sm:top-[2%] max-sm:flex max-sm:justify-center max-sm:items-center">
        <div className="w-2/3 relative left-[30%] max-sm:left-0 max-sm:w-full max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
          <h1 className="text-dblue text-center text-9xl font-extrabold max-sm:text-[5.5rem]">AvaTour</h1>
          <h1 className="mt-4 mb-8 text-center text-descblue text-2xl font-extrabold w-[95%]">
            Вашият фокус е туризмът, нашият – отчетността!
          </h1>
        </div>
      </div>

      <div className="z-30 w-full top-[73%] absolute max-sm:top-[57%]">
        <div className="left-[15%] bottom-0 h-36 w-fit absolute flex flex-col justify-between max-sm:left-0 max-sm:w-full">
          <Link href="/login">
            <div className="bg-lightyellow hover:bg-slightlydarkeryellow sm:hover:shadow-none hover:translate-x-xbtn hover:translate-y-ybtn shadow-ycustom w-full rounded-xl cursor-pointer max-sm:w-[70%] max-sm:mx-auto max-sm:shadow-mobileBtnCustom max-sm:hover:translate-x-0 max-sm:hover:translate-y-0">
              <h1 className="text-dyellow text-center font-semibold text-4xl py-2 select-none max-sm:text-3xl">Вход</h1>
            </div>
          </Link>
          <Link href="/register">
            <div className="bg-lightyellow hover:bg-slightlydarkeryellow sm:hover:shadow-none hover:translate-x-xbtn hover:translate-y-ybtn shadow-ycustom w-full rounded-xl cursor-pointer max-sm:w-[70%] max-sm:mx-auto max-sm:shadow-mobileBtnCustom max-sm:hover:translate-x-0 max-sm:hover:translate-y-0">
              <h1 className="text-dyellow text-center font-semibold text-4xl px-5 py-2 select-none max-sm:text-3xl">Регистрация</h1>
            </div>
          </Link>
        </div>
      </div>

      <div
        className={`bg-gradient-to-t from-black to-transparent w-full h-36 z-10 absolute bottom-0 flex items-end justify-center transition-opacity duration-500 max-sm:fixed ${gradientOpacityClass}`}
      >
        <div
          onClick={handleArrowClick}
          className={`cursor-pointer flex justify-center items-center animate-bounce w-24 h-1/2 transition-opacity duration-500 ${gradientOpacityClass}`}
        >
          <ArrowIcon />
        </div>
      </div>

      <div id="description" className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-gradientdblue to-gradientlblue w-2/5 h-fit rounded-2xl max-sm:w-[85%] max-sm:mt-[-50%]">
          <h1 className="mt-7 text-center text-ddblue text-5xl font-extrabold">Какво е AvaTour?</h1>
          <h1 className="mt-4 mb-8 text-center text-descblue text-2xl font-extrabold w-[95%]">AvaTour е система за текущо и извънсчетоводно управление на финансовите потоци. Тя предоставя възможност за по-добър контрол, оптимизация на ресурсите и минимизиране на финансовите рискове.</h1>
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
