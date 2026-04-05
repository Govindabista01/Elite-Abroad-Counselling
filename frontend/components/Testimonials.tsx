'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "Abhishek Thapa",
        university: "University of Sydney",
        destination: "Australia",
        text: "Elite Abroad Counselling made my dream of studying in Australia a reality. Their visa guidance was impeccable and the process was smooth.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Shruti Sharma",
        university: "University of Manchester",
        destination: "United Kingdom",
        text: "I was confused about university selection, but the team here helped me find the perfect fit for my career goals. Highly recommended!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Rohan Gurung",
        university: "University of Toronto",
        destination: "Canada",
        text: "The IELTS preparation classes were top-notch. I achieved a band 8.0 thanks to the expert tutors at Elite Abroad.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4 block italic">Success Stories</span>
                    <h2 className="text-4xl md:text-5xl font-black text-primary uppercase italic tracking-tighter">
                        What Our Students <span className="text-secondary">Say</span>
                    </h2>
                    <div className="w-24 h-2 bg-secondary mx-auto mt-6"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-transparent hover:border-primary transition-all relative group"
                        >
                            <div className="absolute top-8 right-8 text-primary/10 group-hover:text-secondary/20 transition-colors">
                                <Quote size={60} />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-secondary text-secondary" />
                                ))}
                            </div>

                            <p className="text-gray-500 font-medium italic mb-8 relative z-10 leading-relaxed">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/10">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-black text-primary uppercase text-sm tracking-wide">{t.name}</h4>
                                    <p className="text-secondary font-bold text-[10px] uppercase tracking-widest">{t.university}, {t.destination}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
