"use client";

import { db } from "@/firesebase";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import SidebarRow from "./sidebarRow";

function SideBar() {
    const [snapshot, loading, error] = useCollection(query(collection(db, "search"), orderBy("start_eta", "desc")));
    return (
        <div className="p-2 md:p-10 py-6 overflow-y-auto border-b border-indigo-500/50">
            <div className="flex flex-col items-center justify-center mb-16">
                <DocumentMagnifyingGlassIcon className="w-16 h-16 text-indigo-600" />
                <h1 className="hidden md:inline text-center text-2xl my-2 font-bold">Web Scraper</h1>
                <h2 className="hidden md:inline text-base text-gray-500 text-center">Scraping the Unscrapable</h2>
            </div>

            <ul className="flex flex-col gap-2 py-2 overflow-x-auto">
                {snapshot?.docs.map((doc) => (
                    <SidebarRow key={doc.id} doc={doc} />
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
