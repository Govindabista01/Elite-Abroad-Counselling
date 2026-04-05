'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    countries: { id: number; name: string }[];
    initialData?: {
        test?: string;
        country?: string;
        title?: string;
        accent?: string;
        isApplication?: boolean;
    };
}

export default function ConsultationModal({ isOpen, onClose, countries, initialData }: Props) {
    const [title, setTitle] = useState({ main: 'Get Free', accent: 'Counselling' });
    const [isApplication, setIsApplication] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        country: initialData?.country || '',
        level: '',
        test: initialData?.test || '',
        academicScore: '',
        intake: '',
        agreed: false
    });

    React.useEffect(() => {
        if (isOpen && initialData) {
            if (initialData.test) setFormData(prev => ({ ...prev, test: initialData.test || '' }));
            if (initialData.country) setFormData(prev => ({ ...prev, country: initialData.country || '' }));
            if (initialData.title) setTitle({ main: initialData.title, accent: initialData.accent || '' });
            setIsApplication(!!initialData.isApplication);
        }
        if (!isOpen) {
            // Reset modal state when closed
            setTimeout(() => {
                setTitle({ main: 'Get Free', accent: 'Counselling' });
                setIsApplication(false);
            }, 300);
        }
    }, [isOpen, initialData]);

    React.useEffect(() => {
        const handleOpen = (e: any) => {
            const data = e.detail;
            if (data?.test) setFormData(prev => ({ ...prev, test: data.test || '' }));
            if (data?.country) setFormData(prev => ({ ...prev, country: data.country || '' }));
            if (data?.title) setTitle({ main: data.title, accent: data.accent || 'Inquiry' });
            if (data?.isApplication) setIsApplication(true);
        };
        window.addEventListener('open-consultation', handleOpen);
        return () => window.removeEventListener('open-consultation', handleOpen);
    }, []);

    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: null, message: 'Processing your request...' });

        try {
            await fetchAPI('/inquiries/', {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    destination: formData.country,
                    study_level: formData.level,
                    test_type: formData.test,
                    message: isApplication
                        ? `UNIVERSITY APPLICATION: ${title.accent}. Student Score: ${formData.academicScore}, Intake: ${formData.intake}. Test: ${formData.test}`
                        : `Initial inquiry from Consultation Modal. Interested in studying at ${formData.level} level in ${formData.country}.`
                })
            });

            setStatus({ type: 'success', message: isApplication ? 'Application Submitted! We will review your profile.' : 'Thank you! Our counselor will contact you shortly.' });
            setTimeout(() => {
                onClose();
                setStatus({ type: null, message: '' });
                setFormData({
                    name: '', address: '', email: '', phone: '',
                    country: '', level: '', test: '', academicScore: '', intake: '', agreed: false
                });
            }, 3000);
        } catch (err) {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
            console.error('Inquiry error:', err);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#002B5B]/40"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-primary/10 overflow-hidden my-auto"
                    >
                        {/* Compact Header */}
                        <div className="bg-primary/5 p-6 md:p-8 flex justify-between items-center border-b border-primary/5 text-left">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <Send size={20} />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black text-primary leading-tight uppercase italic tracking-tighter">
                                    {title.main} <span className="text-secondary">{title.accent}</span>
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-md transition-all group"
                            >
                                <X size={18} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 text-left">
                            <div className="grid md:grid-cols-2 gap-5">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all text-sm"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                {/* Address */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City/Address *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Kathmandu"
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all text-sm"
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email *</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all text-sm"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone *</label>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+977-98XXXXXXXX"
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all text-sm"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                {/* Country */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm cursor-pointer"
                                        value={formData.country}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map(c => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Level */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Study Level</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm cursor-pointer"
                                        value={formData.level}
                                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                                    >
                                        <option value="">Select Level</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="Postgraduate">Postgraduate</option>
                                        <option value="PHD">PHD</option>
                                        <option value="Diploma">Diploma</option>
                                    </select>
                                </div>
                            </div>

                            {isApplication && (
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Score (GPA/%) *</label>
                                        <input
                                            required={isApplication}
                                            type="text"
                                            placeholder="e.g. 3.5 GPA or 85%"
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 focus:bg-white transition-all text-sm"
                                            value={formData.academicScore}
                                            onChange={e => setFormData({ ...formData, academicScore: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Intake *</label>
                                        <select
                                            required={isApplication}
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm cursor-pointer"
                                            value={formData.intake}
                                            onChange={e => setFormData({ ...formData, intake: e.target.value })}
                                        >
                                            <option value="">Select Intake</option>
                                            <option value="Spring 2026">Spring 2026</option>
                                            <option value="Fall 2026">Fall 2026</option>
                                            <option value="Spring 2027">Spring 2027</option>
                                            <option value="Fall 2027">Fall 2027</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* English Test - only for general inquiries */}
                            {!isApplication && (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Language Proficiency Test</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm cursor-pointer"
                                        value={formData.test}
                                        onChange={e => setFormData({ ...formData, test: e.target.value })}
                                    >
                                        <option value="">Status of IELTS/PTE/Duolingo</option>
                                        <option value="IELTS">IELTS</option>
                                        <option value="PTE">PTE</option>
                                        <option value="TOEFL">TOEFL</option>
                                        <option value="Duolingo">Duolingo</option>
                                        <option value="None">Not yet</option>
                                    </select>
                                </div>
                            )}

                            {/* Agreements and Action */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        required
                                        className="w-4 h-4 rounded border-gray-200 text-primary focus:ring-primary transition-all"
                                        checked={formData.agreed}
                                        onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                                    />
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider leading-none">
                                        I agree to the <span className="text-secondary hover:underline">Terms</span> and <span className="text-secondary hover:underline">Privacy Policy</span> *
                                    </span>
                                </label>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="w-full md:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-black text-xs hover:bg-secondary transition-all shadow-xl shadow-primary/10 uppercase flex items-center justify-center gap-3 tracking-widest"
                                >
                                    {isApplication ? 'Submit Application' : 'Send Inquiry'}
                                    <Send size={14} />
                                </motion.button>
                            </div>

                            {/* Status Message */}
                            <AnimatePresence>
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`p-3 rounded-xl text-center font-black uppercase text-[10px] tracking-widest ${status.type === 'success' ? 'bg-green-50 text-green-600' :
                                            status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'
                                            }`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
