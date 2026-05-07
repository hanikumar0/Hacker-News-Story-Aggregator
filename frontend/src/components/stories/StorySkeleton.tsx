import React from 'react';
import Skeleton from '../ui/Skeleton';

const StorySkeleton = () => {
  return (
    <div className="bg-surface/30 border border-white/5 rounded-[2rem] p-8 space-y-6">
      <div className="flex justify-between">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-3/4 h-6" />
      </div>
      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
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
  );
};

export default StorySkeleton;
