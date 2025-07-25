"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type Post = {
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    views: number;
};
const Featured = () => {
    const { isFetched, data, isFetching } = useQuery({
        queryFn: async () => {
            const response = await fetch("http://localhost:8000/api/blogs");
            const { allPosts }: { allPosts: Post[] } = await response.json();

            return allPosts.sort((a, b) => b.views - a.views).slice(0, 3);
        },

        queryKey: ["allBlogs"],
    });
    return (
        <section className="w-[90vw] max-w-6xl mx-auto my-20 px-4">
            <h2 className="text-4xl font-bold text-center text-blue-500 mb-10">
                Featured Posts
            </h2>
            {isFetched && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from(data as Post[]).map((post, index) => (
                        <Card
                            key={index}
                            className="rounded-2xl shadow-md transition hover:shadow-lg hover:scale-[1.02] duration-300 px-3 py-6"
                        >
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 flex flex-col justify-between h-full">
                                <p className="text-muted-foreground text-sm">
                                    {post.description}
                                </p>
                                <Button asChild className="w-full">
                                    <Link
                                        href={`http://localhost:3000/blogs/${post.slug}`}
                                    >
                                        Read More
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {isFetching && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Skeleton className={"h-40 w-full"}></Skeleton>
                    <Skeleton className={"h-40 w-full"}></Skeleton>
                    <Skeleton className={"h-40 w-full"}></Skeleton>
                </div>
            )}
        </section>
    );
};

export default Featured;
