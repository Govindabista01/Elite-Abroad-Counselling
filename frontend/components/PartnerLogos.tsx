'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import UniversityLogo from '@/components/UniversityLogo';

interface University {
    id: number;
    name: string;
    website?: string;
    country_name?: string;
}

interface Props {
    universities?: University[];
}

// Static fallback list (shown before API responds)
const defaultPartners = [
    { name: 'University of Melbourne', country: 'Australia' },
    { name: 'University of Sydney', country: 'Australia' },
    { name: 'Australian National University', country: 'Australia' },
    { name: 'University of Oxford', country: 'UK' },
    { name: 'University of Cambridge', country: 'UK' },
    { name: 'Imperial College London', country: 'UK' },
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'McGill University', country: 'Canada' },
    { name: 'University of British Columbia', country: 'Canada' },
    { name: 'Technical University of Munich', country: 'Germany' },
    { name: 'RWTH Aachen University', country: 'Germany' },
    { name: 'Heidelberg University', country: 'Germany' },
];

function LogoCard({ name }: { name: string }) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.04 }}
            className="mx-4 flex-shrink-0 cursor-pointer"
        >
            <div className="relative group/card">
                {/* Hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-0 group-hover/card:opacity-15 transition duration-500" />

                {/* Card */}
                <div className="relative w-48 h-36 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 px-4 overflow-hidden">
                    {/* Real university logo via Wikipedia */}
                    <UniversityLogo name={name} size="md" />

                    {/* Name */}
                    <p className="text-[10px] font-bold text-gray-600 text-center leading-tight line-clamp-2 px-1">
                        {name}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function PartnerLogos({ universities }: Props) {
    const displayPartners =
        universities && universities.length > 0
            ? universities.map(u => ({ name: u.name }))
            : defaultPartners;

    // Duplicate for seamless infinite scroll
    const doubled = [...displayPartners, ...displayPartners];

    return (
        <section className="py-16 bg-[#FAFAFA] border-y border-gray-100 overflow-hidden">
            {/* Heading */}
            <div className="container mx-auto px-6 mb-14 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block"
                >
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4 block italic">
                        Our Network
                    </span>
                    <h2 className="text-4xl font-black text-primary uppercase italic tracking-tighter mb-4">
                        University Partners
                    </h2>
                    <div className="w-24 h-2 bg-secondary mx-auto rounded-full" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 font-medium mt-6 max-w-2xl mx-auto text-lg"
                >
                    We collaborate with top-tier global institutions to provide our students
                    with the best educational opportunities abroad.
                </motion.p>
            </div>

            {/* Scrolling banner */}
            <div className="relative py-6">
                {/* Fade masks */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#FAFAFA] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#FAFAFA] to-transparent z-20 pointer-events-none" />

                <div className="flex animate-marquee">
                    {doubled.map((p, i) => (
                        <LogoCard key={i} name={p.name} />
                    ))}
                </div>
            </div>

            {/* View All button */}
            <div className="container mx-auto px-6 mt-14 text-center">
                <Link href="/universities">
                    <motion.div
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -15px rgba(0, 43, 91, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block group relative bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-sm transition-all overflow-hidden cursor-pointer"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            View All Universities
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </span>
                        <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-secondary transition-all duration-300 -z-0" />
                    </motion.div>
                </Link>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    animation: marquee 55s linear infinite;
                    width: max-content;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
