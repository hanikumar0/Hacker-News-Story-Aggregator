"use client";
import React, { useState, useEffect } from 'react';
import { fetchBookmarks } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useBookmarks } from '@/context/BookmarkContext';
import StoryList from '@/components/stories/StoryList';
import Section from '@/components/layout/Section';
import { Bookmark, Inbox } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function BookmarksPage() {
    const { user, loading: authLoading } = useAuth();
    const { bookmarkedIds, toggleBookmark } = useBookmarks();
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getBookmarks = async () => {
        try {
            setLoading(true);
            const { data } = await fetchBookmarks();
            setBookmarks(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            getBookmarks();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading, bookmarkedIds]); // Re-fetch if bookmarkedIds change to keep this page in sync

    return (
        <Section className="space-y-12">
            <header className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-primary/10 border border-violet-primary/20 rounded-full text-violet-primary text-[10px] font-black uppercase tracking-widest">
                    <Bookmark size={12} />
                    Personal Collection
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tightest">
                    Your Saved <span className="text-violet-primary">Knowledge</span>
                </h1>
                <p className="text-text-secondary text-lg max-w-xl font-medium leading-relaxed">
                    A curated repository of stories and discussions you've hand-picked for deeper exploration.
                </p>
            </header>

            {bookmarks.length === 0 && !loading ? (
                <div className="glass-panel py-32 text-center space-y-6">
                    <div className="w-20 h-20 bg-surface-hover/50 rounded-[2rem] flex items-center justify-center mx-auto border border-white/5">
                        <Inbox className="text-text-secondary" size={32} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">Your list is currently empty</h3>
                        <p className="text-text-secondary max-w-sm mx-auto font-medium">
                            Start exploring the frontier of technology and bookmark the stories that spark your interest.
                        </p>
                    </div>
                </div>
            ) : (
                <StoryList 
                    stories={bookmarks} 
                    loading={loading} 
                    bookmarks={bookmarkedIds} 
                    onBookmarkToggle={toggleBookmark} 
                />
            )}
        </Section>
    );
}
