"use client";

import '../globals.css';
import Navbar from '../components/Navbar';
import EditIcon from '../components/EditIcon';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="mb-20 flex flex-grow items-center justify-center space-x-52">
        <div className="w-1/4 bg-llblue p-8 rounded-xl shadow-lg"></div>

        <div className="w-5/12 bg-llblue p-8 rounded-xl shadow-lg">
          {[
            { label: "Потребителско име", name: "username", type: "text", placeholder: "username" },
            { label: "Email", name: "email", type: "email", placeholder: "email" },
            { label: "Парола", name: "password", type: "password", placeholder: "password" },
          ].map((field, index) => (
            <div key={index} className="relative mb-8">
              <label className="block text-ddblue font-bold text-2xl mb-1">
                <h1 className="cursor-text w-fit">{field.label}</h1>
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  autoComplete="off"
                  placeholder={field.placeholder}
                  className="bg-llblue rounded-t-md block w-full px-2 pt-2 pr-10 border-b-4 border-dblue focus:border-transparent focus:rounded-b-md border-transparent focus:outline-none focus:bg-white text-base text-dblue placeholder:text-dblue placeholder:text-base"
                />
                <div className="absolute inset-y-0 right-2 flex items-center h-full w-6 cursor-pointer">
                  <EditIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}