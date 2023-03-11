'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { FormEvent, useRef } from 'react';

function Header() {
    const inputRef = useRef<HTMLInputElement>(null);
    const submitHanler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputRef.current?.value;
        if (!inputValue) return;
        if (inputValue) {
            inputRef.current.value = '';
        }

        try {
        } catch (error) {}
    };

    return (
        <header className="flex justify-center mb-10">
            <form
                onSubmit={submitHanler}
                className="flex items-center justify-center max-w-md rounded-full px-8  bg-indigo-200 flex-1"
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="search..."
                    className="w-full py-3 bg-transparent outline-none text-indigo-500 placeholder:text-indigo-400"
                />
                <MagnifyingGlassIcon className="w-8 h-8 text-indigo-800/50 hover:cursor-pointer z-10" />
                <button className="hidden">Search </button>
            </form>
        </header>
    );
}

export default Header;
