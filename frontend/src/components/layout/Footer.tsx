import React from 'react';
import { Github, Twitter, Linkedin, Newspaper } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-violet-primary rounded-lg">
                <Newspaper className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-text-primary">
                HN<span className="text-violet-primary">AGGREGATOR</span>
              </span>
            </div>
            <p className="text-text-secondary max-w-sm leading-relaxed text-sm font-medium">
              The ultimate bridge between Hacker News and your productivity. Discover trending stories, curated automatically and saved intelligently.
            </p>
            <div className="flex gap-4 pt-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-surface border border-white/5 rounded-lg text-text-secondary hover:text-violet-primary hover:border-violet-primary/30 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-black text-text-primary uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4 text-xs font-bold text-text-secondary">
              <li><Link href="#" className="hover:text-violet-primary transition-colors">API docs</Link></li>
              <li><Link href="#" className="hover:text-violet-primary transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-text-primary uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-xs font-bold text-text-secondary">
              <li><Link href="#" className="hover:text-violet-primary transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-violet-primary transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-violet-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Hacker News Aggregator. All rights reserved.</p>
          <p>Built with Next.js 14 & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
