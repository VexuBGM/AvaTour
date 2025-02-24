'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import AddIcon from '../components/AddIcon';
import MinimizeIcon from '../components/MinimizeIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { bg } from 'date-fns/locale/bg';

registerLocale('bg', bg);

const CreateInvoice = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [amount, setAmount] = useState('');
    const [number, setNumber] = useState('');
    const [isSupplier, setIsSupplier] = useState(true);
    const [isAddIconClicked, setIsAddIconClicked] = useState(false);
    const [additionalAmount, setAdditionalAmount] = useState('');
    const [additionalDate, setAdditionalDate] = useState<Date | null>(null);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
    
        if (value.startsWith('.')) {
            return;
        }
    
        if (/^\d*\.?\d*$/.test(value)) {
            if (value.indexOf('.') !== -1 && value.split('.').length > 2) {
                return;
            }
    
            if (value.indexOf('.') !== -1) {
                const decimalPart = value.split('.')[1];
                if (decimalPart && decimalPart.length > 2) {
                    return;
                }
            }
            if (value === '0' || value.startsWith('0.') || (value[0] !== '0')) {
                setAmount(value);
            }
        }
    };

    const handleFocus = () => {
        if (amount.includes(' лв.')) {
            setAmount(amount.replace(' лв.', ''));
        }
    };

    const handleBlur = () => {
        if (amount && !amount.includes('лв.')) {
            setAmount(amount + ' лв.');
        }
    };

    const handleAdditionalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value.startsWith('.')) {
            return;
        }
        if (/^\d*\.?\d*$/.test(value)) {
            if (value.indexOf('.') !== -1 && value.split('.').length > 2) {
                return;
            }
    
            if (value.indexOf('.') !== -1) {
                const decimalPart = value.split('.')[1];
                if (decimalPart && decimalPart.length > 2) {
                    return;
                }
            }
            if (value === '0' || value.startsWith('0.') || (value[0] !== '0')) {
                setAdditionalAmount(value);
            }
        }
    };    
    
    const handleAdditionalFocus = () => {
        if (additionalAmount.includes(' лв.')) {
            setAdditionalAmount(additionalAmount.replace(' лв.', ''));
        }
    };
    
    const handleAdditionalBlur = () => {
        if (additionalAmount && !additionalAmount.includes('лв.')) {
            setAdditionalAmount(additionalAmount + ' лв.');
        }
    };
     

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        setNumber(value);
    };

    const handleNumberFocus = () => {
        setNumber(number.replace(/^0+/, '') || '');
    };

    const handleNumberBlur = () => {
        if (number) {
            setNumber(number.padStart(10, '0'));
        }
    };

    return (
        <div className="h-screen">
            <div className="block sm:hidden">
                <NavbarMobile />
            </div>
            <div className="hidden sm:block">
                <Navbar />
            </div>

            <div className="pt-[8rem] flex flex-col items-center justify-center min-h-[calc(100vh-40vh)]">
                <div className="flex justify-center items-center bg-lblue rounded-lg mb-8 w-[17rem] shadow-lg max-sm:w-[17rem]">
                    <div
                        className={`border-4 ${isSupplier ? 'border-dblue' : 'border-transparent'} cursor-pointer hover:bg-lbluehover2 px-3 py-2 rounded-l-lg w-1/2 flex justify-center items-center max-sm:hover:bg-transparent`}
                        onClick={() => setIsSupplier(true)}
                    >
                        <h1 className="font-semibold text-ddblue">Доставчици</h1>
                    </div>
                    <div
                        className={`border-4 ${!isSupplier ? 'border-dblue' : 'border-transparent'} cursor-pointer hover:bg-lbluehover2 px-3 py-2 rounded-r-lg w-1/2 flex justify-center items-center max-sm:hover:bg-transparent`}
                        onClick={() => setIsSupplier(false)}
                    >
                        <h1 className="font-semibold text-ddblue">Клиенти</h1>
                    </div>
                </div>

                <div className="w-2/5 bg-lblue px-8 pb-6 pt-4 rounded-xl shadow-registerLoginCustom mb-14 max-sm:w-[85%] max-sm:px-5">
                    <form className="space-y-4">
                        <div className="flex flex-col items-end">
                            <label className="block text-ddblue font-bold text-2xl mb-1">
                                <h1 className="cursor-text w-fit">Номер</h1>
                            </label>
                            <input
                                type="text"
                                name="number"
                                autoComplete="off"
                                placeholder="Въведете номер"
                                className="bg-llblue rounded-t-md rounded-b-md block w-[10rem] px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue text-center placeholder:text-base placeholder:text-center max-sm:w-1/2"
                                value={number}
                                onChange={handleNumberChange}
                                onFocus={handleNumberFocus}
                                onBlur={handleNumberBlur}
                                inputMode="numeric"
                            />
                        </div>

                        <div>
                            <label className="block text-ddblue font-bold text-2xl mb-1">
                                <h1 className="cursor-text w-fit">{isSupplier ? 'Име на доставчика' : 'Име на клиента'}</h1>
                            </label>

                            <input
                                type="text"
                                name="username"
                                autoComplete="off"
                                placeholder="Въведете име"
                                className="bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
                            />
                        </div>

                        <div className="flex justify-center items-center space-x-10">
                            <div className="flex flex-col justify-center items-center w-1/2">
                                <label className="block text-ddblue font-bold text-2xl mb-1">
                                    <h1 className="cursor-text w-fit">Сума</h1>
                                </label>
                                <input
                                    type="text"
                                    name="amount"
                                    autoComplete="off"
                                    placeholder="Въведете сума"
                                    className="text-center bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    inputMode="numeric"
                                />
                            </div>

                            <div className="flex flex-col justify-center items-center w-1/2">
                                <label className="block text-ddblue font-bold text-2xl mb-1">
                                    <h1 className="cursor-text w-fit">Дата</h1>
                                </label>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd.MM.yyyy"
                                    locale="bg"
                                    placeholderText="Изберете дата"
                                    className="text-center bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between items-center pt-6 pb-1">
                            <div
                                className="hover:bg-lbluehover bg-llblue w-10 cursor-pointer shadow-registerLoginCustom rounded-md"
                                title={isAddIconClicked ? '' : "Ако вече е платена част от сумата, натиснете тук, за да я отбележите."}
                                onClick={() => setIsAddIconClicked(!isAddIconClicked)}
                            >
                                {isAddIconClicked ? <MinimizeIcon /> : <AddIcon />}
                            </div>

                            <button
                                type="submit"
                                className="w-3/5 bg-lightyellow shadow-registerLoginCustom hover:bg-slightlydarkeryellow rounded-xl cursor-pointer text-dyellow text-center font-semibold text-2xl px-5 py-2 select-none"
                            >
                                Създаване
                            </button>
                        </div>

                        {isAddIconClicked && (
                            <div className="border-t-2 pt-4 border-dashed border-llblue">
                                <label className="text-ddblue font-bold text-2xl mb-1 flex justify-center">
                                    <h1 className="cursor-text w-fit text-center">Ако вече е платена част от сумата, запишете я тук:</h1>
                                </label>
                                <div className="flex justify-center items-center space-x-10 mt-4">
                                    <div className="flex flex-col justify-center items-center w-1/2">
                                        <label className="block text-ddblue font-bold text-2xl mb-1">
                                            <h1 className="cursor-text w-fit">Сума</h1>
                                        </label>
                                        <input
                                            type="text"
                                            name="additionalAmount"
                                            autoComplete="off"
                                            placeholder="Въведете сума"
                                            className="text-center bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
                                            value={additionalAmount}
                                            onChange={handleAdditionalAmountChange}
                                            onFocus={handleAdditionalFocus}
                                            onBlur={handleAdditionalBlur}
                                            inputMode="numeric"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-center items-center w-1/2">
                                        <label className="block text-ddblue font-bold text-2xl mb-1">
                                            <h1 className="cursor-text w-fit">Дата</h1>
                                        </label>
                                        <DatePicker
                                            selected={additionalDate}
                                            onChange={(date) => setAdditionalDate(date)}
                                            dateFormat="dd.MM.yyyy"
                                            locale="bg"
                                            placeholderText="Изберете дата"
                                            className="text-center bg-llblue rounded-t-md rounded-b-md block w-full px-2 pt-2 border-b-4 focus:border-dblue focus:rounded-b-sm border-transparent focus:outline-none shadow-sm text-base text-dblue placeholder:text-dblue placeholder:text-base"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateInvoice;
