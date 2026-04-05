'use client';

import { motion } from 'framer-motion';

export default function UniversitySkeleton() {
    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-150 p-6 flex flex-col gap-6 shadow-sm overflow-hidden relative group">
            {/* Shimmer Effect */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 z-10"
            />

            {/* Logo placeholder */}
            <div className="h-32 bg-primary/5 rounded-3xl animate-pulse"></div>

            {/* Text details */}
            <div className="space-y-4 px-2">
                <div className="h-6 w-3/4 bg-primary/10 rounded-full animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-100 rounded-full animate-pulse"></div>
            </div>

            {/* Action text */}
            <div className="h-4 w-1/3 bg-secondary/10 rounded-full animate-pulse ml-2 mt-4"></div>
        </div>
    );
}

export function UniversityGridSkeleton() {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
            {[...Array(8)].map((_, i) => (
                <UniversitySkeleton key={i} />
            ))}
        </div>
    );
}
