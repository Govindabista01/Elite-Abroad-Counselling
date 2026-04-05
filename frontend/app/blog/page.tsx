'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react';
import Link from 'next/link';
import { fetchAPI, API_URL } from '@/lib/api';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_date: string;
    image?: string;
    author_name?: string;
}

const getBlogPlaceholder = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('germany')) return "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800";
    if (t.includes('canada')) return "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800";
    if (t.includes('uk') || t.includes('london')) return "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800";
    if (t.includes('visa') || t.includes('guide') || t.includes('application')) return "https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&q=80&w=800";
    return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800";
};

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await fetchAPI('/blog/');
                setBlogs(data);
            } catch (err) {
                console.error('Failed to load blogs:', err);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    const filteredBlogs = blogs.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20">
            {/* Header */}
            <div className="container mx-auto px-6 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div>
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4 block italic">Knowledge Base</span>
                        <h1 className="text-5xl md:text-7xl font-black text-primary uppercase italic tracking-tighter">
                            Latest <span className="text-secondary">Insights</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-4 max-w-xl text-lg">
                            Everything you need to know about studying abroad, visa tips, and university life.
                        </p>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-secondary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="SEARCH ARTICLES..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-16 pr-8 py-5 bg-white border-2 border-primary/5 rounded-3xl w-full md:w-[400px] shadow-xl focus:border-secondary outline-none font-black text-sm transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6">
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-[3rem] h-[500px] animate-pulse"></div>
                        ))}
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-40">
                        <h2 className="text-2xl font-black text-primary uppercase italic">No articles found</h2>
                        <p className="text-gray-400 font-medium">Try searching for something else.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredBlogs.map((post, idx) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-[3rem] overflow-hidden border-2 border-transparent hover:border-primary transition-all group flex flex-col shadow-xl"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <img
                                        src={post.image || getBlogPlaceholder(post.title)}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6 bg-secondary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        New Update
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-1">

                                    <h3 className="text-2xl font-black text-primary mb-4 leading-tight group-hover:text-secondary transition-colors uppercase italic">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 font-medium line-clamp-3 mb-8 flex-1 leading-relaxed">
                                        {post.content}
                                    </p>

                                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-4 text-primary font-black uppercase text-xs tracking-[0.2em] group/link">
                                        Read Full Article
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all">
                                            <ArrowRight size={16} />
                                        </div>
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
