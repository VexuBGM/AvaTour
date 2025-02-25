'use client';

import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import AddIcon from '../components/AddIcon';
import MoreInNewTabIcon from '../components/MoreInNewTabIcon';
import DeleteIcon from '../components/DeleteIcon';
import SearchIcon from '../components/SearchIcon';
import Link from 'next/link';

const Invoices = () => {
  return (
    //<ProtectedRoute>
    <div className="h-screen">

      <div className="block sm:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden sm:block">
        <Navbar />
      </div>

      <div className="flex flex-col justify-center items-center pt-[7.5rem] pb-12 max-sm:pt-[8rem]">
        {/* търсачка */}
        <div className="w-full flex justify-center items-center mb-14">
          <div className="relative flex items-center w-[40%] h-10 max-sm:w-[85%]">
            <input
              type="text"
              autoComplete="off"
              placeholder="Потърсете фактура"
              className="bg-llblue shadow-searchBarCustom rounded-full block w-full h-10 px-3 py-1 pr-12 text-base text-dblue placeholder:text-dblue placeholder:text-base outline-none focus:outline-dblue"
            />
            <button className="absolute right-0 cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-lbluehover rounded-full p-1">
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* компютри */}
        <div className="w-[93%] flex justify-between h-fit max-sm:hidden">
          <div className="shadow-invoiceCustom bg-gradientdblue w-1/6 pt-4 rounded-lg flex flex-col justify-between items-center max-sm:w-1/3">
            <Link href="/create-invoice" className="flex justify-center items-center"><div className="bg-white hover:bg-slate-100 rounded-lg w-5/6 cursor-pointer">
              <AddIcon />
            </div></Link>
            <div className="mt-4 mb-2"><h1 className="text-dddblue font-semibold text-xl">Добави</h1></div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 w-[93%] flex justify-between max-sm:hidden">
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
          <div className="shadow-invoiceCustom bg-gradientdblue w-[18%] pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-1/3">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col items-start w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
        </div>


        {/* мобилни устройства */}
        <div className="w-full hidden justify-around max-sm:flex">
          <div className="shadow-invoiceCustom bg-gradientdblue w-1/2 pt-4 rounded-lg flex flex-col justify-between items-center max-sm:w-[50%]">
            <Link href="/create-invoice" className="flex justify-center items-center"><div className="bg-white hover:bg-slate-100 rounded-lg w-5/6 cursor-pointer">
              <AddIcon />
            </div></Link>
            <div className="mt-4 mb-2"><h1 className="text-dddblue font-semibold text-xl">Добави</h1></div>
          </div>
        </div>

        <div className="mt-14 w-full hidden justify-around max-sm:flex">
          <div className="shadow-invoiceCustom bg-gradientdblue w-1/6 pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-[70%]">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col justify-center items-center w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 w-full hidden justify-around max-sm:flex">
          <div className="shadow-invoiceCustom bg-gradientdblue w-1/6 pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-[70%]">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col justify-center items-center w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 w-full hidden justify-around max-sm:flex">
          <div className="shadow-invoiceCustom bg-gradientdblue w-1/6 pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-[70%]">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col justify-center items-center w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 w-full hidden justify-around max-sm:flex">
          <div className="shadow-invoiceCustom bg-gradientdblue w-1/6 pt-1 rounded-lg flex flex-col justify-around items-center max-sm:w-[70%]">
            <div className="mt-2 mb-2 w-full"><h1 className="text-dddblue font-semibold text-xl text-center">клиент</h1></div>
            <div className="border-y-2 border-dashed border-llblue pt-2 pb-2 px-4 flex flex-col justify-center items-center w-full gap-1">
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Номер:</h1><span className="text-dddblue text-xl">0123456789</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Име:</h1><span className="text-dddblue text-xl">име</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Сума:</h1><span className="text-dddblue text-xl">сума</span></div>
              <div className="w-full flex gap-2"><h1 className="text-dddblue font-semibold text-xl">Дата:</h1><span className="text-dddblue text-xl">дата</span></div>
            </div>
            <div className="my-2 flex justify-end items-end w-full">
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Изтриване">
                <DeleteIcon />
              </div>
              <div className="w-[2rem] cursor-pointer hover:bg-lbluehover2 rounded-md mr-1" title="Подробен изглед">
                <MoreInNewTabIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    //</ProtectedRoute>
  );
};

export default Invoices;