import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'indigo' | 'lavender' | 'success';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'violet', className = '' }) => {
  const variants = {
    violet: 'bg-violet-primary/10 text-violet-light border-violet-primary/20',
    indigo: 'bg-indigo-vibrant/10 text-indigo-300 border-indigo-vibrant/20',
    lavender: 'bg-violet-light/10 text-violet-light border-violet-light/10',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
