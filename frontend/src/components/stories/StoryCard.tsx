"use client";
import React from 'react';
import { ThumbsUp, User, Clock, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import BookmarkButton from './BookmarkButton';

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
            className="group glass-card overflow-hidden bg-white border border-border-soft hover:border-violet-primary/20 transition-all duration-300 flex flex-col"
        >
            {/* Visual Header / Placeholder Image */}
            <div className="h-48 w-full bg-surface-hover relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <img 
                    src={story.image || `https://images.unsplash.com/photo-1504715603411-b923902f242d?q=80&w=800&auto=format&fit=crop`} 
                    alt={story.title}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                />
            </div>

            <div className="flex flex-col flex-1 p-6 gap-5">
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

                <div className="flex-1 space-y-3">
                    <a 
                        href={story.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block group-hover:text-violet-primary transition-all duration-300"
                    >
                        <h3 className="text-xl font-black text-text-primary leading-snug tracking-tight line-clamp-2">
                            {story.title}
                        </h3>
                    </a>
                    {story.description && (
                        <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
                            {story.description}
                        </p>
                    )}
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
                        <BookmarkButton 
                            isBookmarked={!!isBookmarked} 
                            onClick={() => onBookmarkToggle?.(story._id)} 
                        />
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
