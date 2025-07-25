"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import CommentItem from "./CommentItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userName: string;
    userEmail: string;
    userId: string;
    postId: string;
    timeAgo: string;
}

interface CommentsResponse {
    msg: string;
    allComments: Comment[];
    total: number;
}

const CommentsContainer = ({ props_postId }: { props_postId: string }) => {
    const [commentText, setCommentText] = useState("");
    const { data: session, status } = useSession();
    const queryClient = useQueryClient();

    // Fetch comments query
    const {
        data: commentsData,
        isLoading: isLoadingComments,
        error: commentsError,
        isError: isCommentsError,
    } = useQuery<CommentsResponse>({
        queryKey: ["comments", props_postId],
        queryFn: async () => {
            console.log("Fetching comments for post:", props_postId);

            const response = await fetch(
                `http://localhost:8000/api/blogs/actions/comments/fetch?postId=${props_postId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `HTTP error! status: ${response.status}`
                );
            }

            const data = await response.json();
            console.log("Fetched comments:", data);

            // Handle the response structure to match your API
            return {
                msg: data.msg,
                allComments: data.allComments || [],
                total: data.total || data.allComments?.length || 0,
            };
        },
        enabled: !!props_postId,
        staleTime: 30 * 1000, // 30 seconds
        refetchOnWindowFocus: false,
        retry: 2,
    });

    // Post comment mutation
    const commentMutation = useMutation({
        mutationFn: async (commentData: {
            props_postId: string;
            commentText: string;
            user: string;
        }) => {
            console.log("Posting comment:", commentData);

            const response = await fetch(
                "http://localhost:8000/api/blogs/actions/comments/post",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `HTTP error! status: ${response.status}`
                );
            }

            const data = await response.json();
            console.log("Comment posted successfully:", data);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Comment posted successfully!");
            setCommentText("");

            // Invalidate and refetch comments to get the latest data
            queryClient.invalidateQueries({
                queryKey: ["comments", props_postId],
            });

            console.log("Comment mutation successful:", data);
        },
        onError: (error: Error) => {
            console.error("Comment mutation error:", error);
            toast.error(
                error.message || "Failed to post comment. Please try again."
            );
        },
    });

    const handleSubmitComment = async (e: FormEvent) => {
        e.preventDefault();

        // Validation
        if (!session?.user?.name) {
            toast.error("You must be logged in to comment");
            return;
        }

        if (!commentText.trim()) {
            toast.error("Please enter a comment");
            return;
        }

        if (commentText.length > 1000) {
            toast.error("Comment is too long (max 1000 characters)");
            return;
        }

        if (!props_postId) {
            toast.error("Invalid post ID");
            return;
        }

        // Prevent double submission
        if (commentMutation.isPending) {
            return;
        }

        try {
            await commentMutation.mutateAsync({
                props_postId,
                commentText: commentText.trim(),
                user: session.user.name,
            });
        } catch (error) {
            // Error is already handled in onError
            console.error("Submit comment error:", error);
        }
    };

    const currentUserInitials =
        session?.user?.name?.slice(0, 2).toUpperCase() || "US";
    const comments = commentsData?.allComments || [];

    return (
        <div className="w-full max-w-none space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 px-1">
                Comments ({commentsData?.total || 0})
            </h2>

            {/* Comment Input Section */}
            {status === "authenticated" ? (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <form
                        onSubmit={handleSubmitComment}
                        className="p-2 sm:p-3 md:p-4"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                            {/* Avatar - Hidden on very small screens, shown inline on larger */}
                            <div className="hidden sm:block flex-shrink-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                                    {currentUserInitials}
                                </div>
                            </div>

                            {/* Input Section */}
                            <div className="flex-1 space-y-3 px-2">
                                {/* Mobile header */}
                                <div className="flex sm:hidden items-start gap-4 mb-3">
                                    <div className="flex-1 text-lg font-medium text-neutral-800">
                                        Write a comment...
                                    </div>
                                </div>

                                <textarea
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                    placeholder="Share your thoughts..."
                                    rows={3}
                                    maxLength={1000}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 bg-white min-h-[80px] sm:min-h-[90px]"
                                    disabled={commentMutation.isPending}
                                />

                                {/* Character count */}
                                <div className="text-xs text-gray-500 text-right">
                                    {commentText.length}/1000
                                </div>

                                {/* Button Container */}
                                <div className="flex justify-end w-full md:w-auto">
                                    <Button
                                        type="submit"
                                        disabled={
                                            !commentText.trim() ||
                                            commentMutation.isPending
                                        }
                                        className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[100px] sm:min-w-[120px] w-full"
                                    >
                                        {commentMutation.isPending ? (
                                            <div className="flex items-center gap-2">
                                                <LoadingSpinner />
                                                <span className="hidden sm:inline">
                                                    Posting...
                                                </span>
                                            </div>
                                        ) : (
                                            "Post Comment"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : status === "unauthenticated" ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                    <p className="text-gray-600 text-sm sm:text-base">
                        Please log in to join the conversation
                    </p>
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                    <div className="flex items-center justify-center">
                        <LoadingSpinner />
                        <span className="ml-2 text-gray-600">Loading...</span>
                    </div>
                </div>
            )}

            {/* Comments List */}
            {isLoadingComments ? (
                <div className="space-y-3 sm:space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
                        >
                            <div className="animate-pulse">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                        <div className="h-3 bg-gray-300 rounded w-1/6"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : isCommentsError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
                    <p className="text-red-600 text-sm sm:text-base">
                        Failed to load comments:{" "}
                        {commentsError?.message || "Unknown error"}
                    </p>
                    <Button
                        onClick={() =>
                            queryClient.invalidateQueries({
                                queryKey: ["comments", props_postId],
                            })
                        }
                        className="mt-2 text-sm"
                        variant="outline"
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <CommentItem
                                comment={{
                                    id: parseInt(comment.id),
                                    userName: comment.userName,
                                    timeAgo: comment.timeAgo,
                                    content: comment.content,
                                    commentedAt: comment.createdAt,
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isLoadingComments &&
                !isCommentsError &&
                comments.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 text-4xl sm:text-5xl mb-4">
                            💬
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base">
                            No comments yet. Be the first to share your
                            thoughts!
                        </p>
                    </div>
                )}
        </div>
    );
};

export default CommentsContainer;
