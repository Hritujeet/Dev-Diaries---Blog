'use client'
import React from 'react';
import { Github, Linkedin, Mail, MapPin, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
            <div className="max-w-xl w-full text-center">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Information</h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Let's connect! Here are the ways you can reach me or follow my work.
                    </p>
                </div>

                {/* Info Container */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-6">
                    <div className="text-left">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Name</h2>
                        <p className="text-gray-600">Hritujeet Sharma</p>
                    </div>

                    <div className="text-left">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
                        <p className="text-gray-600">sharmahritujeet@gmail.com</p>
                    </div>

                    <div className="text-left space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Social Links</h2>
                        <div className="flex flex-col gap-3">
                            <Link href="https://www.linkedin.com/in/hritujeet-sharma-797ba7281/" target="_blank" className="flex items-center gap-2 text-neutral-600 justify-center w-auto font-semibold px-8 py-4 rounded-lg bg-neutral-100 hover:bg-blue-200 hover:text-blue-500 duration-150">
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </Link>
                            <Link href="https://x.com/HritujeetS93526" target="_blank" className="flex items-center gap-2 text-neutral-600 justify-center w-auto font-semibold px-8 py-4 rounded-lg bg-neutral-100 hover:bg-neutral-200 hover:text-neutral-800 duration-150">
                                <Twitter className="w-5 h-5" />
                                Twitter
                            </Link>
                            <Link href="https://www.instagram.com/hritujeet/" target="_blank" className="flex items-center gap-2 text-neutral-600 justify-center w-auto font-semibold px-8 py-4 rounded-lg bg-neutral-100 hover:bg-pink-200 hover:text-pink-600 duration-150">
                                <Instagram className="w-5 h-5" />
                                Instagram
                            </Link>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                        <h4 className="text-xl font-semibold mb-2">Ready to collaborate?</h4>
                        <p className="text-blue-100">I'm always open to discussing new projects and opportunities.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
