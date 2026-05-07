"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AuthFormProps {
    type: 'login' | 'register';
    onSubmit: (data: any) => void;
    loading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-[440px] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f172a]/80 backdrop-blur-3xl p-10 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-primary/20 rounded-full blur-[80px]" />
                
                <div className="relative z-10 space-y-8">
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl font-black text-white tracking-tightest">
                            {type === 'login' ? 'Welcome Back' : 'Join the Pulse'}
                        </h1>
                        <p className="text-slate-400 font-medium">
                            {type === 'login' 
                                ? 'Sign in to access your curated stories' 
                                : 'Create an account to start bookmarking'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {type === 'register' && (
                            <Input
                                icon={User}
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-white/5 border-white/5 text-white placeholder:text-slate-500 h-14 rounded-2xl"
                            />
                        )}
                        <Input
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-white/5 border-white/5 text-white placeholder:text-slate-500 h-14 rounded-2xl"
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-white/5 border-white/5 text-white placeholder:text-slate-500 h-14 rounded-2xl"
                        />

                        <Button 
                            type="submit" 
                            variant="white" 
                            size="lg" 
                            className="w-full h-14 text-base" 
                            loading={loading}
                        >
                            {type === 'login' ? 'Sign In' : 'Create Account'}
                            <ArrowRight size={20} />
                        </Button>
                    </form>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-500">
                            <span className="bg-[#0f172a] px-4">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-white font-bold">
                            <Chrome size={20} />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-white font-bold">
                            <Github size={20} />
                            GitHub
                        </button>
                    </div>
                </div>
            </motion.div>

            <p className="mt-8 text-center text-slate-500 font-bold tracking-tight">
                {type === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <a href={type === 'login' ? '/register' : '/login'} className="text-white hover:text-violet-primary transition-colors">
                    {type === 'login' ? 'Sign up for free' : 'Sign in here'}
                </a>
            </p>
        </div>
    );
};

export default AuthForm;
