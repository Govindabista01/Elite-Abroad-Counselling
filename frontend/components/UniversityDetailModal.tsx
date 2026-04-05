'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Trophy, Users, DollarSign, BookOpen, GraduationCap, ExternalLink, Send } from 'lucide-react';
import { getUniversityDetails, UniversityDetail } from '@/lib/universityData';

import UniversityLogo from './UniversityLogo';

interface University {
    id: number;
    name: string;
    website: string;
    country_name: string;
}

interface Props {
    university: University | null;
    onClose: () => void;
    onApply: (university: University) => void;
}

// Inner component — rendered only when university is truthy
function ModalContent({ university, onClose, onApply }: { university: University; onClose: () => void; onApply: (u: University) => void }) {
    const details: UniversityDetail = getUniversityDetails(university.name);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-[#002B5B]/50"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden my-auto"
            >
                {/* Hero Header */}
                <div className="bg-primary p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <GraduationCap className="absolute -right-10 -top-10 text-white" size={200} />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all group z-10"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform" />
                    </button>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="bg-white p-4 rounded-3xl shadow-xl shrink-0">
                            <UniversityLogo name={university.name} website={university.website} size="lg" />
                        </div>
                        <div>
                            <span className="text-secondary font-black uppercase text-xs tracking-widest mb-2 block">
                                {university.country_name}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic leading-tight mb-3 pr-14">
                                {university.name}
                            </h2>

                            <div className="flex items-center gap-2 text-white/70 text-sm font-bold">
                                <MapPin size={14} className="text-secondary" />
                                {details.location}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 space-y-8 max-h-[60vh] overflow-y-auto">
                    {/* Description */}
                    <p className="text-gray-600 font-medium leading-relaxed text-base">
                        {details.description}
                    </p>

                    {/* Key Facts */}
                    <div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="w-6 h-[2px] bg-secondary rounded" />
                            Key Facts
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Trophy, label: 'World Ranking', value: details.ranking },
                                { icon: Users, label: 'Students', value: details.students },
                                { icon: BookOpen, label: 'Acceptance Rate', value: details.acceptanceRate },
                                { icon: DollarSign, label: 'Tuition / Year', value: details.tuition },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="bg-gray-50 rounded-2xl p-4 hover:bg-primary/5 transition-colors group">
                                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-primary transition-colors">
                                        <Icon size={16} className="text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</div>
                                    <div className="text-sm font-black text-primary">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="w-6 h-[2px] bg-secondary rounded" />
                            Popular Courses & Programs
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {details.courses.map((course: string) => (
                                <span
                                    key={course}
                                    className="px-4 py-2 bg-primary/5 text-primary font-black text-xs uppercase tracking-wide rounded-full hover:bg-secondary/10 hover:text-secondary transition-colors cursor-default"
                                >
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 md:px-10 pb-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    {university.website && (
                        <a
                            href={university.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-primary font-black uppercase text-xs tracking-wider transition-colors"
                        >
                            <ExternalLink size={14} />
                            Official Website
                        </a>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            onClose();
                            onApply(university);
                        }}
                        className="w-full sm:w-auto bg-secondary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition shadow-xl shadow-secondary/20 flex items-center justify-center gap-3"
                    >
                        <Send size={16} />
                        Apply to This University
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

export default function UniversityDetailModal({ university, onClose, onApply }: Props) {
    return (
        <AnimatePresence>
            {university && (
                <ModalContent
                    key={university.id}
                    university={university}
                    onClose={onClose}
                    onApply={onApply}
                />
            )}
        </AnimatePresence>
    );
}
