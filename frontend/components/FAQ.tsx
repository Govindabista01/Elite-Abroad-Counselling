'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        question: "How do I choose the right university?",
        answer: "Our expert counsellors will help you select the best university based on your academic profile, budget, and career goals. We maintain a database of over 500+ global institutions."
    },
    {
        question: "What items are required for the visa process?",
        answer: "The requirements vary by country. Generally, you need academic transcripts, a valid passport, English proficiency scores (IELTS/PTE), a Statement of Purpose (SOP), and financial documents."
    },
    {
        question: "Do you offer test preparation classes?",
        answer: "Yes, we offer professional coaching for IELTS and PTE with experienced tutors, up-to-date study materials, and regular mock tests."
    },
    {
        question: "Is there an application fee for your services?",
        answer: "Our initial counselling session is completely free. We guide you through the entire process, from university selection to visa approval."
    },
    {
        question: "How long does the application process take?",
        answer: "The process can take anywhere from 3 to 6 months depending on the country, university intake, and visa processing times. We recommend starting as early as possible."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                            <HelpCircle size={32} />
                        </div>
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs italic">Frequently Asked</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-primary uppercase italic tracking-tighter">
                        Common <span className="text-secondary">Questions</span>
                    </h2>
                    <div className="w-24 h-2 bg-secondary mt-6"></div>
                </motion.div>

                <div className="max-w-4xl space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className={`w-full flex items-center justify-between p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-300 border-2 ${openIndex === idx
                                    ? 'bg-primary border-primary text-white shadow-2xl md:scale-105 scale-[1.02]'
                                    : 'bg-gray-50 border-gray-100 text-primary hover:border-primary/20'
                                    }`}
                            >
                                <span className={`text-base md:text-xl font-black uppercase italic tracking-tight text-left ${openIndex === idx ? 'text-white' : 'text-primary'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-xl transition-colors ${openIndex === idx ? 'bg-white/20' : 'bg-primary/10'
                                    }`}>
                                    {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 md:p-10 text-gray-400 font-medium text-base md:text-lg leading-relaxed bg-primary/5 rounded-[2rem] md:rounded-[2.5rem] mt-2 border border-primary/10">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
