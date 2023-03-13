"use client";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "react-spinkit";
type Props = {
    doc: DocumentData;
};

function SidebarRow({ doc }: Props) {
    const [active, setActive] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (!pathName) return;
        setActive(pathName.includes(doc.id));
    }, [pathName, doc]);
    return (
        <li
            onClick={() => router.push(`/search/${doc.id}`)}
            className={`flex justify-between items-center p-4 cursor-pointer hover:shadow-md rounded-lg ${
                active && "bg-white shadow-md"
            }`}
        >
            <div className="flex flex-col justify-center">
                <p className="text-xs md:text-base font-bold">{doc.data().search}</p>
                <p className="text-sm text-gray-400">
                    {doc.data().status === "pending" && <span>Scraping infomation</span>}
                </p>
            </div>

            <span>
                {doc.data().status === "pending" ? (
                    <Spinner color="#6366f1" name="cube-grid" fadeIn="none" />
                ) : (
                    <CheckCircleIcon className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                )}
            </span>
        </li>
    );
}

export default SidebarRow;
