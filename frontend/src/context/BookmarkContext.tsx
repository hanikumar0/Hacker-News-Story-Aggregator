"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchBookmarks, toggleBookmark as toggleBookmarkApi } from '@/lib/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

interface Story {
    _id: string;
    title: string;
    url: string;
    author: string;
    points: number;
    postedAt: string;
    description?: string;
    image?: string;
}

interface BookmarkContextType {
    bookmarkedIds: string[];
    bookmarkedStories: Story[];
    toggleBookmark: (storyId: string) => Promise<void>;
    isBookmarked: (storyId: string) => boolean;
    loading: boolean;
    refreshBookmarks: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
    const [bookmarkedStories, setBookmarkedStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    const loadBookmarks = useCallback(async () => {
        if (!user) {
            setBookmarkedIds([]);
            setBookmarkedStories([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const { data } = await fetchBookmarks();
            const stories: Story[] = data.data || [];
            setBookmarkedStories(stories);
            setBookmarkedIds(stories.map((s) => s._id));
        } catch (error) {
            console.error('[BookmarkContext] Failed to load bookmarks:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Load bookmarks when auth is ready — NOT when bookmarkedIds changes
    useEffect(() => {
        if (!authLoading) {
            loadBookmarks();
        }
    }, [user, authLoading, loadBookmarks]);

    const toggleBookmark = async (storyId: string) => {
        if (!user) {
            toast.error('Please sign in to save stories');
            return;
        }

        if (!storyId) {
            console.error('[BookmarkContext] toggleBookmark called with undefined storyId');
            toast.error('Invalid story ID');
            return;
        }

        // Optimistic update for bookmarkedIds
        const wasBookmarked = bookmarkedIds.includes(storyId);
        const prevIds = [...bookmarkedIds];
        const prevStories = [...bookmarkedStories];

        if (wasBookmarked) {
            setBookmarkedIds(prev => prev.filter(id => id !== storyId));
            setBookmarkedStories(prev => prev.filter(s => s._id !== storyId));
        } else {
            setBookmarkedIds(prev => [...prev, storyId]);
            // Story object will be populated on next full refresh
        }

        try {
            console.log('[BookmarkContext] Calling toggleBookmark API for storyId:', storyId);
            const { data } = await toggleBookmarkApi(storyId);
            console.log('[BookmarkContext] API response:', data);

            // Sync IDs from backend response (source of truth)
            if (Array.isArray(data.bookmarks)) {
                setBookmarkedIds(data.bookmarks);
            }

            // Refresh full story objects from the backend after toggling
            await loadBookmarks();

            toast.success(wasBookmarked ? 'Removed from collection' : 'Added to collection');
        } catch (error: any) {
            // Rollback on error
            setBookmarkedIds(prevIds);
            setBookmarkedStories(prevStories);
            const msg = error?.response?.data?.message || 'Update failed';
            console.error('[BookmarkContext] Toggle error:', error?.response?.data || error);
            toast.error(msg);
        }
    };

    const isBookmarked = (storyId: string) => bookmarkedIds.includes(storyId);

    return (
        <BookmarkContext.Provider value={{ 
            bookmarkedIds, 
            bookmarkedStories,
            toggleBookmark, 
            isBookmarked, 
            loading,
            refreshBookmarks: loadBookmarks
        }}>
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
