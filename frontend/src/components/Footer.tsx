import React from "react";
import Link from "next/link";
import {FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="py-10 mt-20 bg-white">
            <div className="w-[90vw] max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand & Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">Dev Diaries by Hritujeet</h2>
                    <p className="text-sm">
                        Developer. Creator. Explorer.<br/>
                        Sharing code, ideas, and everything in between.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold mb-1">Quick Links</h3>
                    <ul className="text-sm space-y-1">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/projects" className="hover:underline">Projects</Link></li>
                        <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Connect</h3>
                    <div className="flex gap-4 items-center">
                        <a href="https://github.com/Hritujeet" target="_blank" rel="noopener noreferrer"
                           className="hover:text-white">
                            <FaGithub size={20}/>
                        </a>
                        <a href="https://www.linkedin.com/in/hritujeet-sharma-797ba7281/" target="_blank"
                           rel="noopener noreferrer" className="hover:text-white">
                            <FaLinkedin size={20}/>
                        </a>
                        <a href="https://x.com/HritujeetS93526" className="hover:text-white">
                            <FaTwitter size={20}/>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom line */}
            <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-500 md:w-[80vw] mx-auto">
                © {new Date().getFullYear()} Hritujeet Sharma. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
