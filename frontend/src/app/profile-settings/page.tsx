"use client";

import '../globals.css';
import Navbar from '../components/Navbar';
import EditIcon from '../components/EditIcon';
import DoneIcon from '../components/DoneIcon';


export default function ProfileSettings() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="mb-20 flex flex-grow items-center justify-center space-x-52">
        <div className="w-1/4 bg-llblue p-8 rounded-xl shadow-lg">

        </div>

        <div className="w-5/12 bg-llblue p-8 rounded-xl shadow-lg">
            <label className="block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Потребителско име</h1></label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="username"
              className="bg-llblue rounded-t-md block w-full px-2 pt-2 border-b-4 border-dblue focus:border-transparent focus:rounded-b-md focus:outline-none focus:bg-white text-base text-dblue placeholder:text-dblue placeholder:text-base"
            />

            <label className="mt-8 block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Email</h1></label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="email"
              className="bg-llblue rounded-t-md block w-full px-2 pt-2 border-b-4 border-dblue focus:border-transparent focus:rounded-b-md focus:outline-none focus:bg-white text-base text-dblue placeholder:text-dblue placeholder:text-base"
            />

            <label className="mt-8 block text-ddblue font-bold text-2xl mb-1"><h1 className="cursor-text w-fit">Парола</h1></label>
            <input
                type={//showPassword ? "text" : 
                "password"}
                name="password"
                placeholder="password"
                className="bg-llblue rounded-t-md block w-full px-2 pt-2 border-b-4 border-dblue focus:border-transparent focus:rounded-b-md focus:outline-none focus:bg-white text-base text-dblue placeholder:text-dblue placeholder:text-base"
              />
        </div>
      </div>
    </div>
  );
}