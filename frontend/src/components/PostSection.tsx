"use client";
import React, {useEffect, useState} from "react";
import CommentsContainer from "@/components/CommentsContainer";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useRouter, useParams} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import {Calendar, Clock, Eye, Heart} from "lucide-react";
import {useSession} from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";

const PostSection = () => {
    const {slug}: { slug: string } = useParams();
    const router = useRouter();
    const session = useSession();
    const userEmail = session.data?.user?.email;
    const isAuthenticated = session.status === "authenticated";

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const queryClient = useQueryClient();

    const likeMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(
                `http://localhost:8000/api/blogs/actions/${slug}/like`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: userEmail}),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            return response.json();
        },
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: ["post", slug, userEmail]});

            const previousData = queryClient.getQueryData(["post", slug, userEmail]);
            const previousIsLiked = isLiked;
            const previousLikeCount = likeCount;

            // Optimistic update only if not already liked
            if (!isLiked) {
                setIsLiked(true);
                setLikeCount((prev) => prev + 1);
            }

            return {previousData, previousIsLiked, previousLikeCount};
        },
        onSuccess: (result, variables, context) => {
            if (result.alreadyLiked && !result.madeLike) {
                // If already liked, revert optimistic update and inform user
                toast.error("You've already liked this post!");
                if (context) {
                    setIsLiked(context.previousIsLiked);
                    setLikeCount(context.previousLikeCount);
                }
            } else if (result.madeLike) {
                toast.success("Post liked successfully!");
                setIsLiked(true);
                // Use backend count if available, otherwise keep optimistic count
                if (result.likeCount !== undefined) {
                    setLikeCount(result.likeCount);
                }
            }

            // Invalidate and refetch the post query to ensure data consistency
            queryClient.invalidateQueries({queryKey: ["post", slug, userEmail]});
        },
        onError: (error, variables, context) => {
            console.error("Like failed:", error);
            toast.error(error.message || "Failed to like post. Please try again.");

            // Rollback optimistic updates on error
            if (context) {
                setIsLiked(context.previousIsLiked);
                setLikeCount(context.previousLikeCount);
            }
        },
    });

    const {isFetched, data, error, isFetching} = useQuery({
        queryFn: async () => {
            // Build URL with email parameter only if user is authenticated
            const baseUrl = `http://localhost:8000/api/blogs/post/${slug}`;
            const url = userEmail ? `${baseUrl}?email=${userEmail}` : baseUrl;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch post: ${response.status}`);
            }

            const result = await response.json();

            // Handle response structure - some properties might not exist for unauthenticated users
            const {
                post,
                alreadyLiked = false,
                likeCount = 0,
                alreadySaved = false
            } = result;

            return {post, alreadyLiked, likeCount, alreadySaved};
        },
        queryKey: ["post", slug, userEmail || "anonymous"],
        // Allow query to run even without authentication
        enabled: !!slug,
        retry: 2,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (data) {
            setIsLiked(data.alreadyLiked);
            setLikeCount(data.likeCount);
        }
    }, [data]);

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const calculateReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    };

    const removeFirstH1 = (htmlContent: string) => {
        return htmlContent.replace(/<h1[^>]*>.*?<\/h1>/i, "").trim();
    };

    const handleLike = () => {
        if (!isAuthenticated) {
            toast.error("Please sign in to like posts");
            router.push("/signin");
            return;
        }

        if (isLiked) {
            toast.error("You have already liked this post");
            return;
        }

        if (likeMutation.isPending) {
            return;
        }

        likeMutation.mutate();
    };

    if (isFetching) {
        return (
            <div className="w-full mx-auto px-4 py-8">
                <div className="space-y-6">
                    <Skeleton className="h-12 w-3/4"/>
                    <Skeleton className="h-4 w-1/2"/>
                    <div className="flex gap-4">
                        <Skeleton className="h-4 w-24"/>
                        <Skeleton className="h-4 w-20"/>
                    </div>
                    <Skeleton className="h-64 w-full"/>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-2/3"/>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Post Not Found
                    </h2>
                    <p className="text-gray-600">
                        The blog post you&#39;re looking for doesn&#39;t exist or has
                        been removed.
                    </p>
                </div>
            </div>
        );
    }

    if (isFetched && data) {
        return (
            <div className="min-h-screen w-full rounded-lg">
                <article className="max-w-4xl mx-auto px-4 py-8">
                    <header className="mb-12">
                        <div className="bg-white rounded-xl shadow-lg shadow-blue-200 border border-gray-200 p-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                                {data.post.title}
                            </h1>

                            {data.post.description && (
                                <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
                                    {data.post.description}
                                </p>
                            )}

                            <div
                                className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-100">
                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4"/>
                                        <span>
                                            {formatDate(data.post.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4"/>
                                        <span>
                                            {calculateReadTime(data?.post?.content)}{" "}
                                            min read
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Heart className="w-4 h-4"/>
                                        <span>{likeCount} likes</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-4 h-4"/>
                                        <span>{data.post.views} views</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                                            isLiked
                                                ? "bg-red-50 border-red-200 text-red-600"
                                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-red-200 hover:text-red-600"
                                        }`}
                                        disabled={isLiked || likeMutation.isPending}
                                    >
                                        {likeMutation.isPending && (
                                            <LoadingSpinner/>
                                        )}
                                        {!likeMutation.isPending && (
                                            <>
                                                <Heart
                                                    className={`w-4 h-4 transition-all duration-200 ${
                                                        isLiked
                                                            ? "fill-red-600 text-red-600"
                                                            : "text-current"
                                                    }`}
                                                />
                                                <span className="text-sm font-medium">
                                                    {isAuthenticated ? (isLiked ? "Liked" : "Like") : "Sign in to like"}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="mb-16 blog-content">
                        <div
                            className="bg-white rounded-xl shadow-lg shadow-blue-200 border border-gray-200 p-8 md:p-12">
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: removeFirstH1(data.post.content),
                                }}
                            />
                        </div>
                    </main>

                    {data && (
                        <section className="my-10">
                            <CommentsContainer props_postId={data?.post.id}/>
                        </section>
                    )}
                </article>
            </div>
        );
    }

    return null;
};

export default PostSection;