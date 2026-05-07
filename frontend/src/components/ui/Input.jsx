import React from 'react';

const Input = ({ label, icon: Icon, error, className = '', ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-sm font-medium text-text-secondary ml-1">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full bg-surface/50 border border-border rounded-xl py-3 ${Icon ? 'pl-11' : 'px-4'} pr-4 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all ${error ? 'border-red-500/50 focus:ring-red-500/20' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
