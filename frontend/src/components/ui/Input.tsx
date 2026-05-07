import React, { useState } from 'react';
import { LucideIcon, Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, icon: Icon, type, error, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-1">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-violet-primary transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full bg-surface border border-white/5 rounded-2xl py-4 transition-all duration-300 focus:outline-none focus:border-violet-primary/50 focus:ring-4 focus:ring-violet-primary/5 text-sm font-medium ${
            Icon ? 'pl-12' : 'px-6'
          } ${isPassword ? 'pr-12' : 'pr-6'} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-violet-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400 font-medium ml-1">{error}</p>}
    </div>
  );
};

export default Input;
