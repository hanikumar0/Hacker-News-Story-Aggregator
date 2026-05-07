"use client";
import React from 'react';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
    isBookmarked: boolean;
    onClick: () => void;
    className?: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked, onClick, className = "" }) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isBookmarked 
                    ? 'gradient-primary text-white shadow-lg shadow-violet-primary/20' 
                    : 'bg-surface text-text-secondary hover:text-violet-primary hover:bg-violet-soft'
            } ${className}`}
            title={isBookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
        >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
    );
};

export default BookmarkButton;
