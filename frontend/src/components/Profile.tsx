"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const Profile = () => {
    const { data: session } = useSession();

    const query = useQuery({
        queryFn: async () => {
            if (!session?.user?.email) {
                return null;
            }
            const response = await fetch(`http://localhost:8000/api/user/${session.user.email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const { data } = await response.json();
            return data;
        },
        queryKey: ["userData", session?.user?.email],
        enabled: !!session?.user?.email,
    });

    if (query.isLoading || query.isPending) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-sm p-10 mb-8 border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center justify-center md:items-start gap-8">
                            <Skeleton className="w-32 h-32 rounded-full" />
                            <div className="flex-1 text-center md:text-left">
                                <Skeleton className="h-8 w-3/4 mb-2" />
                                <Skeleton className="h-6 w-1/2" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-5">
                                <Skeleton className="w-16 h-16 rounded-2xl" />
                                <div>
                                    <Skeleton className="h-5 w-32 mb-2" />
                                    <Skeleton className="h-8 w-24" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-5">
                                <Skeleton className="w-16 h-16 rounded-2xl" />
                                <div>
                                    <Skeleton className="h-5 w-32 mb-2" />
                                    <Skeleton className="h-8 w-24" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-8 h-8 rounded-xl" />
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                <div className="flex items-start gap-6">
                                    <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                        <Skeleton className="h-4 w-full mb-3" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (query.isError) {
        return <div className="text-center text-red-600 min-h-screen flex items-center justify-center">Error: {query.error.message}</div>;
    }

    if (!query.data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Please log in to view your profile.</p>
            </div>
        );
    }

    const { likedPosts, likes, comments } = query.data;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-sm p-10 mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-center md:items-start gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-100">
                                {session?.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="Profile"
                                        width={128}
                                        height={128}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                                        {session?.user?.name?.charAt(0) || "U"}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                {session?.user?.name || "Anonymous User"}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {session?.user?.email || "user@example.com"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Comments Made
                                </h3>
                                <p className="text-3xl font-bold text-gray-900">
                                    {comments || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Posts Liked
                                </h3>
                                <p className="text-3xl font-bold text-gray-900">
                                    {likes || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Your Liked Posts
                            </h2>
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                {likedPosts?.length || 0}
                            </span>
                        </div>
                    </div>

                    <div className="p-8">
                        {likedPosts && likedPosts.length > 0 ? (
                            likedPosts.map((like: any) => (
                                <Link href={`/blogs/${like.post.slug}`}
                                    key={like.post.slug}
                                    className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all duration-300 mb-6 last:mb-0 cursor-pointer block"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="font-semibold text-gray-900 text-xl">
                                                    {like.post.title}
                                                </h3>
                                            </div>

                                            <p className="text-gray-600 text-base leading-relaxed">
                                                {like.post.description || like.post.content?.substring(0, 150) + '...' || 'No description available.'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg">No liked posts yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;