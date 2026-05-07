import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthForm = ({ type, onSubmit, loading, error }) => {
  const isLogin = type === 'login';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card p-8 md:p-10 shadow-2xl shadow-primary/10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
            {isLogin ? <Lock className="text-primary" size={28} /> : <User className="text-primary" size={28} />}
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-text-secondary mt-2 text-center text-sm font-medium">
            {isLogin 
              ? 'Enter your credentials to access your dashboard' 
              : 'Join the community of elite tech enthusiasts'}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {!isLogin && (
            <Input
              label="Full Name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              icon={User}
            />
          )}

          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            icon={Mail}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            icon={Lock}
            minLength={6}
          />

          <Button
            type="submit"
            className="w-full h-14 text-lg"
            loading={loading}
            icon={ArrowRight}
          >
            {isLogin ? 'Sign In' : 'Get Started'}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-text-secondary text-sm font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <Link 
              to={isLogin ? '/register' : '/login'}
              className="text-primary hover:text-primary-hover font-bold transition-colors underline-offset-4 hover:underline"
            >
              {isLogin ? 'Create one for free' : 'Sign in instead'}
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;
