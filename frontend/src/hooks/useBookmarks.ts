"use client";
import { useBookmarks as useBookmarkContext } from '@/context/BookmarkContext';

/**
 * Custom hook to access the global bookmark state and actions.
 * Provides bookmarkedIds, toggleBookmark function, and helper states.
 */
export const useBookmarks = () => {
    const { bookmarkedIds, toggleBookmark, isBookmarked, loading } = useBookmarkContext();
    
    return {
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        loading
    };
};

export default useBookmarks;
