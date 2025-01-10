import React from "react";
import Link from "next/link";
import MyLogo from "@/assets/icons/MyLogo";



export function MyFooter() {
    return (
        <footer className="w-full bg-white p-8 bottom-0">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <MyLogo key={"footer"} size={24} />
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <p className="text-center font-normal">
                &copy; 2025 Marcelo de Melo Junior. All rights reserved.
            </p>
        </footer>
    );
}