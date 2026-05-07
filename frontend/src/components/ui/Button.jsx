import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false,
  icon: Icon,
  ...props 
}) => {
  const variants = {
    primary: 'bg-violet-primary text-white shadow-lg shadow-violet-primary/20 hover:shadow-violet-primary/40',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:border-violet-primary/30 hover:text-violet-primary',
    ghost: 'text-slate-500 hover:text-violet-primary hover:bg-violet-soft',
    outline: 'border-2 border-violet-primary/20 text-violet-primary bg-transparent hover:border-violet-primary hover:bg-violet-primary/5',
    white: 'bg-white text-slate-900 shadow-xl shadow-violet-primary/10 hover:shadow-violet-primary/20',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-12 py-4 text-base font-bold',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 disabled:opacity-50 font-black uppercase tracking-widest ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : Icon && <Icon size={size === 'lg' ? 20 : 18} />}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
};

export default Button;
