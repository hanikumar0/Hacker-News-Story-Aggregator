"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchBookmarks, toggleBookmark as toggleBookmarkApi } from '@/lib/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

interface BookmarkContextType {
    bookmarkedIds: string[];
    toggleBookmark: (storyId: string) => Promise<void>;
    isBookmarked: (storyId: string) => boolean;
    loading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const loadBookmarks = async () => {
        if (!user) {
            setBookmarkedIds([]);
            setLoading(false);
            return;
        }

        try {
            const { data } = await fetchBookmarks();
            // Backend returns populated objects, we only need the IDs for the global state
            const ids = data.data.map((story: any) => story._id);
            setBookmarkedIds(ids);
        } catch (error) {
            console.error('Failed to load bookmarks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            loadBookmarks();
        }
    }, [user, authLoading]);

    const toggleBookmark = async (storyId: string) => {
        if (!user) {
            toast.error('Please sign in to save stories');
            return;
        }

        // Optimistic Update
        const wasBookmarked = bookmarkedIds.includes(storyId);
        const previousIds = [...bookmarkedIds];

        if (wasBookmarked) {
            setBookmarkedIds(prev => prev.filter(id => id !== storyId));
        } else {
            setBookmarkedIds(prev => [...prev, storyId]);
        }

        try {
            const { data } = await toggleBookmarkApi(storyId);
            // Sync with backend response to ensure accuracy
            if (data.bookmarks) {
                setBookmarkedIds(data.bookmarks);
            }
            toast.success(wasBookmarked ? 'Removed from collection' : 'Added to collection');
        } catch (error) {
            // Rollback on error
            setBookmarkedIds(previousIds);
            toast.error('Update failed');
            console.error('Bookmark toggle error:', error);
        }
    };

    const isBookmarked = (storyId: string) => bookmarkedIds.includes(storyId);

    return (
        <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark, isBookmarked, loading }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (context === undefined) {
        throw new Error('useBookmarks must be used within a BookmarkProvider');
    }
    return context;
};
