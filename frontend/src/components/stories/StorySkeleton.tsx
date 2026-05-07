import React from 'react';
import Skeleton from '../ui/Skeleton';

const StorySkeleton = () => {
  return (
    <div className="glass-card overflow-hidden bg-white border border-border-soft flex flex-col">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-6 flex-1">
        <div className="flex justify-between items-center">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-3/4 h-8" />
        </div>
        <div className="pt-6 border-t border-border-soft flex justify-between items-center mt-auto">
          <div className="flex gap-4">
            <Skeleton className="w-12 h-6" />
            <Skeleton className="w-20 h-4" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-10 h-10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySkeleton;
