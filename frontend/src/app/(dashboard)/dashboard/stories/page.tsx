"use client";
import React, { useState, useEffect } from 'react';
import { fetchStories, triggerScrape } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useBookmarks } from '@/context/BookmarkContext';
import StoryList from '@/components/stories/StoryList';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Feed() {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const { user } = useAuth();
    const { bookmarkedIds, toggleBookmark } = useBookmarks();

    const getStories = async () => {
        try {
            setLoading(true);
            const { data } = await fetchStories();
            setStories(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStories();
    }, [user]);

    const handleSync = async () => {
        try {
            setSyncing(true);
            await triggerScrape();
            // Small delay to let MongoDB writes fully commit before we read
            await new Promise(resolve => setTimeout(resolve, 500));
            await getStories(); // FIXED: must await so feed updates after scrape
            toast.success('Feed synchronized — new stories loaded');
        } catch (error) {
            console.error('Sync error:', error);
            toast.error('Sync failed — check your connection');
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="relative">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] glow-blur opacity-10 pointer-events-none" />

            <Section className="py-4 lg:py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Badge variant="violet">Pulse Feed</Badge>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Real-time Intelligence
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-tight">
                            The Tech <br />
                            <span className="gradient-heading">Newsroom</span>
                        </h1>
                        <p className="text-text-secondary text-lg max-w-xl font-medium leading-relaxed">
                            A curated perspective on the global technology landscape. 
                            Built for builders, refined for leaders.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:flex-none h-14 px-8 border-white/5" 
                            onClick={handleSync}
                            loading={syncing}
                            icon={RefreshCw}
                        >
                            Sync Now
                        </Button>
                        <Button 
                            className="flex-1 md:flex-none h-14 px-8" 
                            onClick={getStories}
                            icon={TrendingUp}
                        >
                            Refresh
                        </Button>
                    </div>
                </div>

                <StoryList 
                    stories={stories} 
                    loading={loading} 
                    bookmarks={bookmarkedIds} 
                    onBookmarkToggle={toggleBookmark} 
                />
            </Section>
        </div>
    );
}
