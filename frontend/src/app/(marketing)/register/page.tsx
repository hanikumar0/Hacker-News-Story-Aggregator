"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { register } from '@/lib/api';
import AuthForm from '@/components/auth/AuthForm';
import { toast } from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const { loginUser } = useAuth();
    const router = useRouter();

    const handleRegister = async (formData: any) => {
        try {
            setLoading(true);
            const { data } = await register(formData);
            loginUser(data.user, data.token);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-violet-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-vibrant/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

            <div className="relative z-10 w-full space-y-8">
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-violet-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <ShieldCheck size={14} />
                        Identity Verification Enabled
                    </div>
                </div>
                <AuthForm type="register" onSubmit={handleRegister} loading={loading} />
            </div>
        </div>
    );
}
