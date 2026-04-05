'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Universities', href: '/universities' },
        { name: 'About Us', href: '/#about' },
        { name: 'Destinations', href: '/#destinations' },
        { name: 'Services', href: '/#services' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg border-b border-gray-100 py-2' : 'bg-transparent py-4'
                }`}>
                {/* Scroll Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-secondary origin-left"
                    style={{ scaleX }}
                />

                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative overflow-hidden">
                            <img
                                src="/logo.png"
                                alt="Elite Abroad Counselling Logo"
                                className={`transition-all duration-500 ${isScrolled ? 'h-12' : 'h-16'} object-contain`}
                            />
                            <motion.div
                                className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                            />
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-10">
                        <div className="flex space-x-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative group overflow-hidden"
                                >
                                    <span className="font-black text-primary uppercase tracking-wider text-sm">
                                        {link.name}
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                </Link>
                            ))}
                        </div>

                        <div className="relative group">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-secondary rounded-full blur-xl -z-10"
                            />
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-consultation'))}
                                className="bg-secondary text-white px-8 py-3 rounded-full font-black hover:bg-orange-600 transition-all shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.5)] active:scale-95 uppercase text-xs tracking-widest relative"
                            >
                                Consult Now
                            </button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-[90] md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-20 right-6 w-56 bg-white rounded-2xl shadow-2xl z-[100] flex flex-col p-5 space-y-4 md:hidden border border-gray-100 origin-top-right"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-black text-primary uppercase tracking-wide hover:text-secondary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    window.dispatchEvent(new CustomEvent('open-consultation'));
                                }}
                                className="w-full text-center bg-secondary text-white py-3 rounded-xl font-black uppercase text-sm shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] mt-2 active:scale-95 transition-transform"
                            >
                                Consult Now
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
