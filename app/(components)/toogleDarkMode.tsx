'use client';
import { useState } from "react";

export default function ToggleDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    }

    return (
        <div className="flex items-center justify-center">
            <button
                className="flex items-center justify-center w-10 h-10 p-3 bg-gray-200 rounded-full dark:bg-gray-800"
                onClick={toggleDarkMode}
            >
                {darkMode ? (
                    <svg
                        className="w-4 h-4 text-gray-800 dark:text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-4 h-4 text-gray-800 dark:text-gray-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path

                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}
