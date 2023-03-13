"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { toast } from "react-hot-toast";
import Spinner from "react-spinkit";

function Header() {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const submitHanler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputRef.current?.value;
        if (!inputValue) return;
        if (inputValue) {
            inputRef.current.value = "";
        }

        const notification = toast.loading(`Starting a Scraper for : ${inputValue}`, {
            icon: <Spinner name="cube-grid" color="#6366f1" />,
            style: {
                borderRadius: "10px",
                background: "#f5deb3",
                color: "#6366f1",
                fontWeight: "500",
            },
        });

        try {
            const reponse = await fetch("/api/activateScraper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search: inputValue }),
            });

            const { collection_id, start_eta } = await reponse.json();
            toast.success("Scraper started searching", {
                id: notification,
                icon: <Spinner name="cube-grid" color="#6366f1" />,
                style: {
                    borderRadius: "10px",
                    background: "#84f6ad",
                    color: "#6366f1",
                    fontWeight: "500",
                },
            });
            router.push(`/search/${collection_id}`);
        } catch (error) {
            toast.error("Whoopss... Something went wrong!", {
                id: notification,
                icon: <Spinner name="cube-grid" color="#6366f1" />,
                style: {
                    borderRadius: "10px",
                    background: "red",
                    color: "#6366f1",
                    fontWeight: "500",
                },
            });
        }
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
                    className="w-full py-[6px] bg-transparent outline-none text-indigo-500 placeholder:text-indigo-400"
                />
                <MagnifyingGlassIcon
                    className="w-5 h-5 text-indigo-800/50 hover:text-indigo-700
                 hover:cursor-pointer z-10"
                />
                <button className="hidden">Search </button>
            </form>
        </header>
    );
}

export default Header;

//https://e509-2402-800-61e7-f786-9537-95d0-e047-2983.ap.ngrok.io/web-scraper-f3800/us-central1/onScraperComplete
