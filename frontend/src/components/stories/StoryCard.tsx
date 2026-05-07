"use client";
import React from 'react';
import { Bookmark, ThumbsUp, User, Clock, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

interface Story {
  _id: string;
  title: string;
  url: string;
  author: string;
  points: number;
  postedAt: string;
}

interface StoryCardProps {
  story: Story;
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isBookmarked, onBookmarkToggle }) => {
    let domain = 'news.ycombinator.com';
    try {
        if (story.url) {
            domain = new URL(story.url).hostname.replace('www.', '');
        }
    } catch (e) {
        console.error('Invalid URL:', story.url);
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group glass-card p-6 bg-white border border-border-soft hover:border-violet-primary/20 transition-all duration-300"
        >
            <div className="flex flex-col h-full gap-6">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-surface flex items-center justify-center border border-border-soft shrink-0">
                            <Globe size={12} className="text-text-secondary group-hover:text-violet-primary transition-colors" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-secondary truncate">{domain}</span>
                    </div>
                    <Badge variant={story.points > 300 ? 'violet' : 'indigo'} className="shrink-0 whitespace-nowrap">
                        {story.points > 300 ? 'High Signal' : 'Curated'}
                    </Badge>
                </div>

                <div className="flex-1">
                    <a 
                        href={story.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block group-hover:text-violet-primary transition-all duration-300"
                    >
                        <h3 className="text-xl md:text-2xl font-black text-text-primary leading-snug tracking-tight line-clamp-3">
                            {story.title}
                        </h3>
                    </a>
                </div>

                <div className="pt-5 border-t border-border-soft flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-violet-soft text-violet-primary rounded-md font-black">
                            <ThumbsUp size={10} />
                            <span>{story.points}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User size={10} className="text-violet-primary" />
                            <span className="truncate max-w-[60px]">{story.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={10} />
                            <span>{story.postedAt}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onBookmarkToggle?.(story._id)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                isBookmarked 
                                    ? 'gradient-primary text-white shadow-lg shadow-violet-primary/20' 
                                    : 'bg-surface text-text-secondary hover:text-violet-primary hover:bg-violet-soft'
                            }`}
                        >
                            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                        <a 
                            href={story.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-text-secondary hover:text-violet-primary hover:bg-violet-soft transition-all"
                        >
                            <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StoryCard;
