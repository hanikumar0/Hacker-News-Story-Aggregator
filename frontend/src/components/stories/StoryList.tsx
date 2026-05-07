"use client";
import React from 'react';
import StoryCard from './StoryCard';
import StorySkeleton from './StorySkeleton';

interface Story {
  _id: string;
  title: string;
  url: string;
  author: string;
  points: number;
  postedAt: string;
}

interface StoryListProps {
  stories: Story[];
  loading?: boolean;
  bookmarks: string[];
  onBookmarkToggle: (id: string) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, loading, bookmarks, onBookmarkToggle }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <StorySkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <StoryCard
          key={story._id}
          story={story}
          isBookmarked={bookmarks.includes(story._id)}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  );
};

export default StoryList;
