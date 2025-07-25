"use client";
import React from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type Post = {
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    likes: number;
    views: number;
};

const BlogsContainer = () => {
    const { data, error, isLoading } = useQuery({
        queryFn: async () => {
            const response = await fetch("http://localhost:8000/api/blogs");
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            const { allPosts }: { allPosts: Post[] } = await response.json();
            console.log(allPosts);

            return allPosts;
        },
        queryKey: ["allBlogs"],
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatCount = (count: number) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + "M";
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + "K";
        }
        return count.toString();
    };

    return (
        <section className="w-[90vw] max-w-6xl mx-auto my-10 px-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent text-center mb-16 tracking-tight my-5">
                Dev Logs & Articles
            </h2>

            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="space-y-3">
                            <Skeleton className="h-48 w-full rounded-xl" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="text-center py-20">
                    <div className="text-gray-500 text-xl font-medium">
                        Failed to load posts. Please refresh the page.
                    </div>
                </div>
            )}

            {data && data.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-gray-500 text-xl font-medium">
                        No posts available yet.
                    </div>
                </div>
            )}

            {data && data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((post: Post, index) => (
                        <Card
                            key={post.slug || index}
                            className="group bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1 flex flex-col justify-between"
                        >
                            <CardHeader className="pb-3 pt-6 px-6">
                                <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                                    {post.title}
                                </CardTitle>
                                <div className="text-sm text-gray-500 font-medium">
                                    {formatDate(post.createdAt)}
                                </div>
                            </CardHeader>
                            <CardContent className="px-6 pb-4">
                                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                    {post.description}
                                </p>

                                {/* Engagement Statistics */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        {/* Likes */}
                                        <div className="flex items-center space-x-1">
                                            <div className="w-6 h-6 bg-gradient-to-br from-rose-500 to-pink-600 rounded-md flex items-center justify-center">
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">
                                                {formatCount(post.likes || 0)}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12 4.5C7 4.5 2.73 8.11 1 12c1.73 3.89 6 7.5 11 7.5s9.27-3.61 11-7.5c-1.73-3.89-6-7.5-11-7.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">
                                                {formatCount(post.views || 0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="w-full"
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 font-semibold rounded-xl transition-all duration-200 group-hover:shadow-md"
                                    >
                                        Read Article
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                                            →
                                        </span>
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
};

export default BlogsContainer;
