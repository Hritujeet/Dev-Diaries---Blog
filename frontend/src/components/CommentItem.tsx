import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const getInitials = (name: string): string => {
    if (!name) return 'U';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

interface Comment {
    id: number;
    userName: string;
    content: string;
    commentedAt: string;
    timeAgo: string;
    postTitle?: string;
    postId?: number;
}

interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    return (
        <Card className="border border-gray-200 hover:shadow-md transition-shadow duration-200 bg-white/80 backdrop-blur-sm">
            <CardContent>
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {getInitials(comment.userName)}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-base font-medium text-gray-900 truncate mr-2">
                                {comment.userName}
                            </h3>
                            <time className="text-sm text-gray-500 flex-shrink-0 mt-1 sm:mt-0">
                                {new Date(comment.commentedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </time>
                        </div>
                        <div className="w-auto">
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                &quot;{comment.content}&quot;
                            </p>
                            {comment.postTitle && (
                                <p className="text-sm text-gray-500 my-2">
                                    On post:{' '}
                                    <span className="font-semibold text-blue-500">
                                        {comment.postTitle}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommentItem;
