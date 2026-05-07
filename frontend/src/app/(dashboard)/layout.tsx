"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
    LayoutDashboard, 
    Newspaper, 
    Bookmark, 
    User, 
    LogOut, 
    Menu, 
    X, 
    Zap, 
    Settings,
    Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { BookmarkProvider } from '@/context/BookmarkContext';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logoutUser } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Newsroom', path: '/dashboard/stories', icon: Newspaper },
        { name: 'Bookmarks', path: '/dashboard/bookmarks', icon: Bookmark },
        { name: 'Profile', path: '/dashboard/profile', icon: User },
    ];

    return (
        <BookmarkProvider>
            <div className="min-h-screen bg-white flex">
            {/* Sidebar - Desktop */}
            <aside 
                className={`hidden lg:flex flex-col border-r border-border-soft bg-white transition-all duration-500 ease-in-out ${
                    isSidebarOpen ? 'w-80' : 'w-24'
                }`}
            >
                <div className="h-[72px] flex items-center px-8 border-b border-border-soft shrink-0 overflow-hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-primary to-indigo-vibrant flex items-center justify-center shrink-0">
                            <Zap className="text-white" size={16} />
                        </div>
                        {isSidebarOpen && (
                            <span className="text-lg font-black tracking-tightest whitespace-nowrap">
                                HN<span className="text-violet-primary">APP</span>
                            </span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                                pathname === item.path 
                                    ? 'bg-violet-soft text-violet-primary' 
                                    : 'text-slate-500 hover:bg-surface hover:text-text-primary'
                            }`}
                        >
                            <item.icon size={20} className={pathname === item.path ? 'text-violet-primary' : 'group-hover:scale-110 transition-transform'} />
                            {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-border-soft space-y-4">
                    {isSidebarOpen && (
                        <div className="p-4 bg-surface rounded-2xl flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-violet-primary/20 flex items-center justify-center text-violet-primary">
                                <User size={16} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-black text-text-primary truncate">{user?.name || 'User'}</p>
                                <p className="text-[10px] font-medium text-slate-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={logoutUser}
                        className="flex items-center gap-4 p-4 w-full rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        {isSidebarOpen && <span className="font-bold text-sm tracking-tight">Log Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-[72px] border-b border-border-soft bg-white/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-20">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-surface rounded-lg transition-colors hidden lg:block"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            {pathname.split('/').pop()?.replace('-', ' ')}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2.5 text-slate-400 hover:text-text-primary hover:bg-surface rounded-xl transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-violet-primary rounded-full border-2 border-white" />
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-text-primary hover:bg-surface rounded-xl transition-all">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto bg-surface/30">
                    <div className="p-8 lg:p-12 w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
        </BookmarkProvider>
    );
}
