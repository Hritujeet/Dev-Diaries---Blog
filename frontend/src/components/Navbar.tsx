"use client";
import Link from "next/link";
import React, { useState } from "react";
import { buttonVariants } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // or whatever toast library you're using"
import Image from "next/image";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    console.log(session?.user?.image);

    console.log(status);

    const handleLogout = async () => {
        try {
            await signOut({
                redirect: false, // Prevent automatic redirect so we can handle it manually
            });

            toast.success("Logged out successfully!");

            // Close dropdown
            setShowDropdown(false);

            // Redirect to sign in page
            router.push("/signin");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error logging out. Please try again.");
        }
    };

    return (
        <nav className="w-full py-3 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center bg-white shadow-sm sticky top-0 z-50 ">
            {/* Logo */}
            <div className="flex justify-evenly items-center w-[80vw] md:w-auto">
                <div className="text-2xl md:text-3xl font-bold text-blue-500 tracking-tight">
                    Dev Diaries
                </div>
                {status === "authenticated" && session?.user && (
                    <div className="relative block md:hidden">
                        <Image
                            src={
                                session.user.image
                                    ? session.user.image
                                    : "../../public/next.svg"
                            }
                            alt={session.user.name || "User"}
                            className="w-10 h-10 rounded-full border-2 border-blue-400 hover:border-blue-500 transition-colors duration-200 cursor-pointer object-cover"
                            title={session.user.name || "User"}
                            onClick={() => setShowDropdown(!showDropdown)}
                            height={10}
                            width={10}
                        />

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                <div className="py-2">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                        <p className="font-medium">
                                            {session.user.name}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            {session.user.email}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/user/${session.user.name}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Navigation Links */}
            <ul className="flex flex-wrap justify-center items-center gap-6 mt-4 md:mt-0 text-sm md:text-base">
                {[
                    { name: "Home", href: "/" },
                    { name: "Blogs", href: "/blogs" },
                    { name: "Projects", href: "/projects" },
                    { name: "About", href: "/about" },
                    { name: "Contact", href: "/contact" },
                ].map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.href}
                            className="text-neutral-800 font-semibold hover:text-blue-500 transition-colors duration-200"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Call to Action / User Avatar */}
            <div className="mt-4 md:mt-0 relative">
                {status === "unauthenticated" && (
                    <Link
                        href="/signin"
                        className={buttonVariants({
                            variant: "default",
                            size: "sm",
                            className: "font-semibold",
                        })}
                    >
                        Sign In
                    </Link>
                )}
                {status === "authenticated" && session?.user && (
                    <div className="relative md:block hidden">
                        <Image
                            src={
                                session.user.image
                                    ? session.user.image
                                    : "../../public/next.svg"
                            }
                            alt={session.user.name || "User"}
                            className="w-10 h-10 rounded-full border-2 border-blue-400 hover:border-blue-500 transition-colors duration-200 cursor-pointer object-cover"
                            title={session.user.name || "User"}
                            onClick={() => setShowDropdown(!showDropdown)}
                            height={10}
                            width={10}
                        />

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                <div className="py-2">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                        <p className="font-medium">
                                            {session.user.name}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            {session.user.email}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/user/${session.user.name}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Click outside to close dropdown */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-5"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
