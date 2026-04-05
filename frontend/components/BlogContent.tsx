'use client';

import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Phone } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_date: string;
    author_name?: string;
    image?: string;
}

export default function BlogContent({ post }: { post: BlogPost }) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 -z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/blog" className="inline-flex items-center gap-4 text-primary font-black uppercase text-xs mb-12 hover:text-secondary group transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    Back to Blog
                </Link>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-10"
                    >
                        {/* Meta */}

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-black text-primary uppercase italic leading-[0.9] tracking-tighter">
                            {post.title}
                        </h1>

                        <div className="w-40 h-3 bg-secondary rounded-full"></div>

                        {/* Banner Image */}
                        <div className="relative h-[400px] md:h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src={post.image || `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200`}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-xl border border-gray-100">
                            <div className="prose prose-2xl prose-primary max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic text-gray-500 font-medium leading-loose whitespace-pre-wrap">
                                {post.content}
                            </div>

                            {/* Share */}
                            <div className="mt-20 pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
                                <div className="flex items-center gap-8">
                                    <span className="text-[12px] font-black text-primary uppercase tracking-[0.4em] italic flex items-center gap-4">
                                        <Share2 size={16} /> Share This
                                    </span>
                                    <div className="flex gap-4">
                                        {[Facebook, Twitter, Linkedin, Phone].map((Icon, i) => (
                                            <button key={i} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-secondary hover:text-white transition-all hover:-translate-y-1">
                                                <Icon size={20} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-consultation'))}
                                    className="bg-primary text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-xl active:scale-95"
                                >
                                    Get Free Counselling
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
