'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft, Search, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import ConsultationModal from "@/components/ConsultationModal";
import UniversityDetailModal from "@/components/UniversityDetailModal";
import UniversityLogo from "@/components/UniversityLogo";
import UniversitySkeleton, { UniversityGridSkeleton } from "@/components/UniversitySkeleton";

interface University {
    id: number;
    name: string;
    website: string;
    country_name: string;
}

interface Country {
    id: number;
    name: string;
}

// Country flag emojis
const countryFlags: Record<string, string> = {
    'Australia': '🇦🇺',
    'United Kingdom': '🇬🇧',
    'Canada': '🇨🇦',
    'Germany': '🇩🇪',
    'United States': '🇺🇸',
    'New Zealand': '🇳🇿',
    'Ireland': '🇮🇪',
    'France': '🇫🇷',
    'Netherlands': '🇳🇱',
};



export default function UniversitiesPage() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [uData, cData] = await Promise.all([
                    fetchAPI('/universities/'),
                    fetchAPI('/countries/')
                ]);
                const countryMap = new Map(cData.map((c: any) => [c.id, c.name]));
                const enrichedUnis = uData.map((u: any) => ({
                    ...u,
                    country_name: countryMap.get(u.country) || 'International'
                }));
                setUniversities(enrichedUnis);
                setCountries(cData);
            } catch (err) {
                console.error('Failed to load universities:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filtered = universities.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());
        const matchesCountry = selectedCountry === 'All' || u.country_name === selectedCountry;
        return matchesSearch && matchesCountry;
    });

    const handleApply = (university: University) => {
        setModalData({
            title: 'Application',
            accent: university.name,
            isApplication: true
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] pt-32 pb-20">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="container mx-auto px-6 mb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-primary font-black uppercase text-xs mb-8 hover:text-secondary transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4 block italic">Our Network</span>
                        <h1 className="text-5xl md:text-6xl font-black text-primary uppercase italic tracking-tighter">
                            Global University <br />
                            <span className="text-secondary">Partners</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-3 max-w-lg text-sm">
                            Click any university to view courses, rankings, and key facts — then apply in seconds.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search universities..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-11 pr-5 py-3.5 bg-white border border-gray-200 rounded-2xl w-full sm:w-72 shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-none font-semibold text-gray-700 text-sm transition-all"
                            />
                        </div>

                        {/* Country filter */}
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="pl-11 pr-8 py-3.5 bg-white border border-gray-200 rounded-2xl w-full sm:w-52 shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-none font-semibold text-gray-700 text-sm transition-all appearance-none cursor-pointer"
                            >
                                <option value="All">All Countries</option>
                                {countries.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Count chip */}
                {!loading && (
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                            {filtered.length} {filtered.length === 1 ? 'University' : 'Universities'} {selectedCountry !== 'All' ? `in ${selectedCountry}` : 'Worldwide'}
                        </span>
                    </div>
                )}
            </div>

            {/* ── University Grid ────────────────────────────────────── */}
            <div className="container mx-auto px-6">
                {loading ? (
                    <UniversityGridSkeleton />
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center">
                        <GraduationCap size={56} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold text-lg">No universities match your search.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {filtered.map((u, idx) => {
                            const flag = countryFlags[u.country_name] || '🌍';
                            return (
                                <motion.div
                                    key={u.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03, duration: 0.35 }}
                                    onClick={() => setSelectedUniversity(u)}
                                    className="bg-white rounded-3xl border border-gray-150 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 flex flex-col gap-4 group"
                                    style={{ borderColor: '#e8ecf0' }}
                                >
                                    {/* Logo area */}
                                    <div className="flex items-center justify-center h-28 bg-gray-50 rounded-2xl group-hover:bg-blue-50/50 transition-colors">
                                        <UniversityLogo name={u.name} size="lg" />
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-col gap-1.5 flex-1">
                                        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                                            {u.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                                            <span>{flag}</span>
                                            {u.country_name}
                                        </p>
                                    </div>

                                    {/* View details link */}
                                    <div className="flex items-center gap-1 text-secondary font-bold text-sm">
                                        <span>View details</span>
                                        <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── CTA ────────────────────────────────────────────────── */}
            {!loading && (
                <div className="container mx-auto px-6 mt-24">
                    <div className="bg-primary p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-3 leading-none">
                            Can't find your university?
                        </h2>
                        <p className="text-white/60 font-medium mb-10 text-base">
                            We partner with 500+ institutions. Get free counselling and we'll find the right fit for you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Link href="/">
                                <button className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 px-10 py-4 rounded-3xl font-black uppercase text-sm transition-all flex items-center gap-2">
                                    ✕ Back to Home
                                </button>
                            </Link>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-secondary text-white px-12 py-5 rounded-3xl font-black uppercase text-base hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-secondary/30"
                            >
                                Get Free Counselling
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* University Detail Modal */}
            <UniversityDetailModal
                university={selectedUniversity}
                onClose={() => setSelectedUniversity(null)}
                onApply={handleApply}
            />

            {/* Consultation / Application Modal */}
            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setModalData(null);
                }}
                countries={countries}
                initialData={modalData}
            />
        </div>
    );
}
