"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchStories } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Zap, Newspaper, X } from 'lucide-react';
import StoryList from '@/components/stories/StoryList';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function Dashboard() {
    const { user } = useAuth();
    const [showPromo, setShowPromo] = useState(true);

    const [recentStories, setRecentStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await fetchStories();
                setRecentStories(data.data.slice(0, 6));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <div className="space-y-12 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="violet">System Online</Badge>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">HN_NODE_V1.02</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tightest">
                        Hello, <span className="gradient-heading">{user?.name || 'Reader'}</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">Here is your curated pulse for today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={Zap} size="sm">Quick Sync</Button>
                    <Button variant="white" icon={Newspaper} size="sm">Newsroom</Button>
                </div>
            </div>


            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Feed Column */}
                <div className={`${showPromo ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-8`}>
                    <div className="flex items-center justify-between border-b border-border-soft pb-4">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <TrendingUp className="text-violet-primary" />
                            Trending Signal
                        </h2>
                        <a href="/dashboard/stories" className="text-[10px] font-black uppercase tracking-widest text-violet-primary hover:underline">View All</a>
                    </div>
                    <StoryList 
                        stories={recentStories} 
                        loading={loading} 
                        bookmarks={[]} 
                        onBookmarkToggle={() => {}} 
                    />
                </div>

                {/* Sidebar Column */}
                {showPromo && (
                    <div className="space-y-8">
                        <AnimatePresence>
                            {showPromo && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    className="glass-card p-8 bg-violet-soft border-violet-primary/10 relative overflow-hidden"
                                >
                                    <button 
                                        onClick={() => setShowPromo(false)}
                                        className="absolute top-4 right-4 p-2 text-violet-primary/50 hover:text-violet-primary transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                    <h3 className="text-xl font-black mb-4">Upgrade to Pro</h3>
                                    <p className="text-sm text-slate-600 font-medium mb-6 leading-relaxed">
                                        Unlock unlimited bookmarks, real-time alerts, and deep technical analysis.
                                    </p>
                                    <Button variant="white" className="w-full">Get Pro Access</Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
