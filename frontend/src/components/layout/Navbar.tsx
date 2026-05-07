"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Bookmark, Menu, X, Newspaper, User, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, protected: true },
    ];

    return (
        <header className={`glass-nav transition-all duration-300 ${scrolled ? 'shadow-sm' : 'bg-transparent border-transparent'}`}>
            <div className="container-main flex items-center justify-between">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="p-2 bg-gradient-to-br from-violet-primary to-indigo-vibrant rounded-xl shadow-lg shadow-violet-primary/10 group-hover:rotate-3 transition-all">
                        <Newspaper className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-black tracking-tightest text-text-primary">
                        HN<span className="text-violet-primary">AGGREGATOR</span>
                    </span>
                </Link>

                {/* Center: Navigation */}
                <div className="hidden lg:flex items-center gap-2">
                    {navLinks.map((link) => (
                        (!link.protected || user) && (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`px-4 py-2 text-sm font-bold tracking-tight rounded-xl transition-all ${
                                    pathname === link.path 
                                        ? 'text-violet-primary bg-violet-soft' 
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                                }`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="white" 
                                size="sm" 
                                className="h-10" 
                                onClick={() => router.push('/dashboard')}
                                icon={LayoutDashboard}
                            >
                                Go to App
                            </Button>
                            <button
                                onClick={logoutUser}
                                className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" size="sm" className="h-10" onClick={() => router.push('/login')}>Login</Button>
                            <Button size="sm" className="h-10" onClick={() => router.push('/register')}>Get Started</Button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-border-soft shadow-xl p-4"
                    >
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                (!link.protected || user) && (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-surface text-text-primary font-bold"
                                    >
                                        <link.icon size={18} className="text-violet-primary" />
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
