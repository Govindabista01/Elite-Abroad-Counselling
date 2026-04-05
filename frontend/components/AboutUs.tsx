'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
    const values = [
        {
            title: 'Transparency',
            description: 'We believe in complete honesty throughout the admission and visa process.',
            icon: <ShieldCheck className="text-secondary w-8 h-8" />
        },
        {
            title: 'Excellence',
            description: 'Our team strives for the highest standards in consultancy and student support.',
            icon: <Award className="text-secondary w-8 h-8" />
        },
        {
            title: 'Student-Centric',
            description: 'Your career goals are our top priority. We tailor our advice to your dreams.',
            icon: <Users className="text-secondary w-8 h-8" />
        },
        {
            title: 'Results Driven',
            description: 'With a 99% visa success rate, we focus on delivering tangible success.',
            icon: <Target className="text-secondary w-8 h-8" />
        }
    ];

    return (
        <section id="about" className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left Side: Image & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="/about_us_consultation.png"
                                alt="Students in University"
                                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-0"></div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-4 block italic">Our Story</span>
                            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase italic leading-tight mb-8">
                                Empowering Global <br />
                                <span className="text-secondary inline-block pr-4">Aspirations</span>
                            </h2>
                            <p className="text-gray-500 text-lg font-medium leading-relaxed">
                                Elite Abroad Counselling was founded with a single vision: to simplify the complex journey of studying abroad.
                                We don't just process applications; we build futures. With over a decade of experience,
                                we've helped thousands of students find their right path in world-class institutions.
                            </p>
                        </motion.div>

                        {/* Values Grid */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            {values.map((value, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 bg-[#FAFAFA] rounded-2xl border-l-4 border-secondary hover:bg-white hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="mb-4">{value.icon}</div>
                                    <h4 className="font-black text-primary uppercase text-sm mb-2">{value.title}</h4>
                                    <p className="text-gray-400 text-xs font-medium leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mission List */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="pt-6 border-t border-gray-100"
                        >
                            <ul className="space-y-4">
                                {[
                                    'Personalized Academic Pathfinding',
                                    'Global University Network Access',
                                    'Hassle-free Visa Processing'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <CheckCircle2 size={20} className="text-secondary" />
                                        <span className="font-black text-primary uppercase text-xs tracking-wider">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
