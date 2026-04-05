'use client';

import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#002B5B] text-white pt-24 pb-12 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-[1.5fr_1fr_1fr] md:grid-cols-2 gap-16 lg:gap-32 mb-20">
                    {/* Company Info */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 rotate-3 group-hover:rotate-12 transition-all overflow-hidden">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter">ELITE <span className="text-secondary">ABROAD</span></h2>
                        </div>
                        <p className="text-gray-300 font-medium leading-relaxed">
                            Empowering students to achieve their global education dreams. Your trusted partner for Australia, UK, Canada, and Germany.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-secondary italic">Quick Links</h3>
                        <ul className="grid grid-cols-1 gap-6">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Universities', href: '/universities' },
                                { name: 'Destinations', href: '/#destinations' },
                                { name: 'Services', href: '/#services' },
                                { name: 'Blog', href: '/blog' },
                                { name: 'Contact Us', href: '/#contact' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} className="text-gray-300 hover:text-secondary flex items-center gap-2 group transition-all font-bold uppercase text-xs tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-all mr-2"></div>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-secondary italic">Contact Us</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 text-gray-300 group">
                                <MapPin size={20} className="text-secondary group-hover:scale-125 transition-transform shrink-0" />
                                <span className="font-bold text-sm leading-relaxed uppercase">Chabahil, Kathmandu, Nepal</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300 group">
                                <Phone size={20} className="text-secondary group-hover:scale-125 transition-transform shrink-0" />
                                <span className="font-bold text-sm tracking-widest uppercase">+977-9869314833</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300 group">
                                <Mail size={20} className="text-secondary group-hover:scale-125 transition-transform shrink-0" />
                                <span className="font-bold text-sm tracking-widest">info@eliteabroad.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 font-black uppercase tracking-widest text-[9px]">
                    <p>© {new Date().getFullYear()} Elite Abroad Counselling. Built for Excellence.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
