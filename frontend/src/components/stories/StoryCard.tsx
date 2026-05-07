"use client";
import React, { useState } from 'react';
import { ThumbsUp, User, Clock, Globe, ArrowUpRight, MessageSquare } from 'lucide-react';
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
  hnLink?: string;
}

interface StoryCardProps {
  story: Story;
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string) => void;
}

/**
 * Generates a deterministic gradient for a given domain string.
 * This ensures each source always gets the same colour pair — visually
 * distinct cards without any external network requests.
 */
function getDomainGradient(domain: string): string {
  // Simple hash: sum char codes then pick from a curated palette
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash);
  }
  const palettes = [
    'from-violet-500/30 to-indigo-600/30',
    'from-emerald-500/30 to-cyan-600/30',
    'from-orange-500/30 to-rose-600/30',
    'from-sky-500/30 to-blue-600/30',
    'from-purple-500/30 to-pink-600/30',
    'from-teal-500/30 to-emerald-600/30',
    'from-amber-500/30 to-orange-600/30',
    'from-indigo-500/30 to-violet-600/30',
  ];
  return palettes[Math.abs(hash) % palettes.length];
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isBookmarked, onBookmarkToggle }) => {
    const [imgError, setImgError] = useState(false);

    let domain = 'news.ycombinator.com';
    try {
        if (story.url) {
            domain = new URL(story.url).hostname.replace('www.', '');
        }
    } catch (e) {
        // keep default domain
    }

    const gradient = getDomainGradient(domain);
    // Only attempt to render an <img> if the story actually has a valid image URL
    const hasImage = !imgError && !!story.image && story.image.trim() !== '';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group glass-card overflow-hidden bg-white border border-border-soft hover:border-violet-primary/20 transition-all duration-300 flex flex-col"
        >
            {/* Card image header — graceful gradient fallback when no image */}
            <div className={`h-48 w-full relative overflow-hidden bg-gradient-to-br ${gradient}`}>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: '24px 24px',
                    }}
                />

                {hasImage ? (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={story.image}
                            alt=""
                            role="presentation"
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                            onError={() => setImgError(true)}
                        />
                    </>
                ) : (
                    /* Gradient placeholder with domain initial */
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2 opacity-40">
                            <Globe size={32} className="mx-auto" />
                            <p className="text-[10px] font-black uppercase tracking-widest truncate max-w-[160px]">
                                {domain}
                            </p>
                        </div>
                    </div>
                )}
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
                        {/* HN discussion link — only shown when available */}
                        {story.hnLink && (
                            <a
                                href={story.hnLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View HN discussion"
                                className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-text-secondary hover:text-amber-500 hover:bg-amber-50 transition-all"
                            >
                                <MessageSquare size={16} />
                            </a>
                        )}
                        {/* External article link */}
                        <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open article"
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
