"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
function ClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster position="top-right" />
            {children}
        </>
    );
}
export default ClientProvider;
