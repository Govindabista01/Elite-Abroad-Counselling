'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 text-center overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                    className="text-[10rem] md:text-[15rem] font-black text-primary/10 leading-none select-none tracking-tighter"
                >
                    404
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="-mt-16 md:-mt-24 space-y-8"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-primary uppercase italic tracking-tighter">
                        Lost in <span className="text-secondary">Space?</span>
                    </h1>

                    <p className="text-gray-400 font-medium text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                        The page you're looking for was either moved, deleted, or never existed in the first place. Let's get you back on track.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-secondary transition-colors inline-flex items-center gap-4"
                            >
                                <Home size={18} />
                                Back to Homepage
                            </motion.button>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="bg-white text-primary border-4 border-primary/5 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:border-primary/20 transition-all inline-flex items-center gap-4"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>

                    <div className="pt-20 border-t border-gray-100 mt-20">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] italic">
                            Elite Abroad Counselling | Built for Excellence
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
