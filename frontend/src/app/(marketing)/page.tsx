"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles, TrendingUp, Users, Shield, LayoutDashboard } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function Landing() {
  const router = useRouter();

  const features = [
    { 
        title: 'Real-time Intelligence', 
        desc: 'Stay ahead with stories synced directly from the source every hour.',
        icon: Zap,
        color: 'bg-violet-soft text-violet-primary'
    },
    { 
        title: 'Smart Curation', 
        desc: 'Advanced algorithms to highlight the highest signal-to-noise content.',
        icon: TrendingUp,
        color: 'bg-emerald-50 text-emerald-600'
    },
    { 
        title: 'Secure Bookmarks', 
        desc: 'Save your knowledge base securely in the cloud with encrypted storage.',
        icon: Shield,
        color: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="relative overflow-x-hidden pt-[72px]">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] glow-blur opacity-10 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] glow-blur opacity-5 animate-blob [animation-delay:2s]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-32 md:pt-20 md:pb-48">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-soft border border-violet-primary/10 text-violet-primary text-[10px] font-black uppercase tracking-[0.2em] mx-auto lg:mx-0">
                <Sparkles size={14} />
                Now Live: Premium Aggregator v1.0
              </div>
              
              <h1 className="heading-hero text-text-primary">
                The Intelligence <br />
                Layer for the <br />
                <span className="gradient-heading">Modern Reader</span>
              </h1>
              
              <p className="text-description max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Connect with the pulse of the tech world. A professionally 
                engineered platform to discover, bookmark, and analyze the 
                most important stories in technology.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" variant="white" className="w-full sm:w-auto h-16 px-12 text-lg" onClick={() => router.push('/register')}>
                  Get Started for Free <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-12 text-lg" onClick={() => router.push('/login')}>
                  Sign In
                </Button>
              </div>

              <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-10">
                 {['Real-time Sync', 'JWT Secure', 'Cloud Saved'].map((item) => (
                   <div key={item} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                     <div className="w-1.5 h-1.5 rounded-full bg-violet-primary" />
                     {item}
                   </div>
                 ))}
              </div>
            </motion.div>

            {/* Right Column: High-End Marketing Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="glass-card p-1 aspect-[16/10] max-w-[600px] mx-auto relative overflow-hidden group border-white">
                <div className="h-full w-full rounded-[1.4rem] bg-slate-900 border border-slate-800 overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-primary/20 via-transparent to-transparent" />
                    {/* Mockup UI Elements */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                        </div>
                        <LayoutDashboard size={14} className="text-slate-500" />
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="h-4 w-[60%] bg-white/10 rounded-full" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-24 bg-white/5 rounded-2xl border border-white/5" />
                            <div className="h-24 bg-white/5 rounded-2xl border border-white/5" />
                        </div>
                        <div className="space-y-3 pt-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-violet-primary/20" />
                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Floating Metrics */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-6 -right-6 p-6 glass-card border-violet-primary/30">
                   <Users className="text-violet-primary" size={24} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="section-spacing">
          <div className="container-main space-y-20">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <Badge variant="violet">Engineered for Builders</Badge>
                <h2 className="heading-section">Why engineers choose our platform</h2>
                <p className="text-description">
                    We've distilled the noise of the internet into a clean, high-performance feed 
                    designed for technical leaders who value signal over noise.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {features.map((feature, i) => (
                    <div key={i} className="glass-card p-10 group">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feature.color}`}>
                            <feature.icon size={28} />
                        </div>
                        <h3 className="text-2xl font-black mb-4 text-text-primary tracking-tight">{feature.title}</h3>
                        <p className="text-text-secondary font-medium leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container-main">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card !bg-violet-soft border-violet-primary/10 p-12 md:p-32 text-center space-y-10 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-primary/5 via-transparent to-transparent pointer-events-none" />
            <h2 className="heading-hero text-text-primary">
              Ready to <span className="gradient-heading">Refine</span> your <br /> tech perspective?
            </h2>
            <p className="text-description max-w-2xl mx-auto">
              Join thousands of technical leaders. Fast, focused, and free forever.
            </p>
            <div className="pt-6">
              <Button variant="white" size="lg" className="h-16 px-16 text-lg" onClick={() => router.push('/register')}>
                Create Free Account
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
