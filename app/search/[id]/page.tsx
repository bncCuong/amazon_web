/* eslint-disable react/no-unescaped-entities */
"use client";

import { db } from "@/firesebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { Results } from "@/components";
import Spinner from "react-spinkit";
import { useRouter } from "next/navigation";
type Props = {
    params: {
        id: string;
    };
};

function SearchPage({ params: { id } }: Props) {
    const [snapshot, loading, error] = useDocument(doc(db, "search", id));
    const router = useRouter();

    const handeDelete = () => {
        deleteDoc(doc(db, "search", id));
        router.push("/");
    };

    const deleteButton = (
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={handeDelete}>
            Delete Search
        </button>
    );

    if (loading)
        return (
            <h1 className="flex justify-center">
                <Spinner color="#6366f1" name="cube-grid" fadeIn="none" />
            </h1>
        );
    if (!snapshot?.exists()) return;

    if (snapshot.data()?.status === "pending") {
        return (
            <div className="flex flex-col gap-5 pb-10 items-center justify-between">
                <Spinner color="#6366f1" name="cube-grid" fadeIn="none" className="w-20 h-20" />
                {deleteButton}
            </div>
        );
    }

    return (
        <div className="flex flex-col mb-7 justify-between items-center">
            <div className="flex flex-col md:flex-row gap-x-4">
                <h1 className="font-bold">
                    Search results for <span className="text-indigo-600">"{snapshot.data()?.search}"</span>
                </h1>
                <p className="text-gray-300 mb-4">
                    / {snapshot.data()?.results?.length > 0 && `${snapshot.data()?.results.length} results found`}
                </p>
            </div>

            <div className="mb-4">{deleteButton}</div>

            {snapshot.data()?.results?.length > 0 && <Results results={snapshot.data()?.results} />}
        </div>
    );
}

export default SearchPage;
