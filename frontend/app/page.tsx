'use client';

import { useEffect, useState, useRef } from 'react';
import { School, FileCheck, GraduationCap, FileSignature, Coins, X, Plane, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PartnerLogos from '@/components/PartnerLogos';
import AboutUs from '@/components/AboutUs';
import ConsultationModal from '@/components/ConsultationModal';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';

const getServiceIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('university') || t.includes('selection')) return <School className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    if (t.includes('visa')) return <FileCheck className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    if (t.includes('scholarship')) return <Coins className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    if (t.includes('application')) return <FileSignature className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    return <GraduationCap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
};

const getServiceImage = (title: string) => {
    const t = title.toLowerCase();
    // Using highly reliable Unsplash IDs
    if (t.includes('university') || t.includes('selection')) return "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600";
    if (t.includes('visa')) return "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600";
    if (t.includes('scholarship')) return "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=600";
    if (t.includes('application')) return "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600";
    return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600";
};

interface Country {
    id: number;
    name: string;
    description: string;
}

interface Service {
    id: number;
    title: string;
    description: string;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    published_date: string;
    image?: string;
}

interface University {
    id: number;
    name: string;
    country: number;
    website: string;
}

interface TestPrep {
    id: number;
    name: string;
    description: string;
    duration: string;
    fee: number;
}

const getBlogPlaceholder = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('germany')) return "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800";
    if (t.includes('canada')) return "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800";
    if (t.includes('uk') || t.includes('london')) return "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800";
    if (t.includes('visa') || t.includes('guide') || t.includes('application')) return "https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&q=80&w=800"; // Reliable documents photo
    return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800";
};

export default function Home() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [universities, setUniversities] = useState<University[]>([]);
    const [testPrep, setTestPrep] = useState<TestPrep[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalData, setModalData] = useState<{ test?: string; country?: string }>({});

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cData, sData, bData, uData, tData] = await Promise.all([
                    fetchAPI('/countries/'),
                    fetchAPI('/services/'),
                    fetchAPI('/blog/'),
                    fetchAPI('/universities/'),
                    fetchAPI('/test-prep/')
                ]);

                setCountries(cData);
                setServices(sData);
                setBlogs(bData);
                setUniversities(uData);
                setTestPrep(tData);
                setError(null);
            } catch (err) {
                console.error('Fetch error:', err);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                setError(`Could not connect to the backend server. Please ensure it is running at ${apiUrl}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleOpenConsultation = () => setIsModalOpen(true);
        window.addEventListener('open-consultation', handleOpenConsultation);
        return () => window.removeEventListener('open-consultation', handleOpenConsultation);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus({ type: null, message: 'Sending...' });
        try {
            await fetchAPI('/inquiries/', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            setFormStatus({ type: 'success', message: 'Sent! We will contact you soon.' });
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            console.error('Inquiry error:', err);
            setFormStatus({ type: 'error', message: 'Error sending message. Server connection failed.' });
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#fafafa]"
            >
                {/* Modern Abstract Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#002B5B 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left space-y-8">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full"
                        >
                            <span className="w-2 h-2 bg-secondary rounded-full animate-ping"></span>
                            <span className="text-secondary font-black text-xs uppercase tracking-[0.2em]">Trusted Abroad Partner</span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-black text-primary leading-[1.1] md:leading-[0.9] tracking-tighter"
                        >
                            ELITE ABROAD <br />
                            <span className="text-secondary italic">COUNSELLING</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-xl text-gray-500 max-w-xl font-medium leading-relaxed"
                        >
                            Your bridge to world-class education. We provide personalized admissions,
                            expert visa guidance, and a pathway to your future in the world's best institutions.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap gap-6 pt-4"
                        >
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-900 transition-all shadow-2xl hover:scale-105 active:scale-95 uppercase"
                            >
                                Start Your Journey
                            </button>
                            <button
                                onClick={() => {
                                    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-white text-primary border-2 border-primary/10 px-10 py-5 rounded-2xl font-black text-lg hover:border-primary transition-all shadow-xl hover:scale-105 active:scale-95 uppercase"
                            >
                                Our Destinations
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="flex items-center gap-10 pt-10 border-t border-gray-100"
                        >
                            <div>
                                <div className="text-3xl font-black text-primary">500+</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Universities</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-primary">4+</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Countries</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-primary">99%</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visa Success</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Image & feature Area */}
                    <div className="relative block h-[350px] md:h-[450px] lg:h-[600px] mt-12 lg:mt-0 w-full max-w-2xl mx-auto lg:max-w-none">
                        {/* Main Hero Photo (Modern & Professional) */}
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute inset-0 rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img
                                src="/hero_students_abroad.png"
                                alt="Students Studying Abroad"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Gradient for better text contrast if needed */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                        </motion.div>



                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/30 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </motion.section>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-8 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-2xl text-center font-black uppercase italic overflow-hidden"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Services */}
                <section id="services" className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-left mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-primary mb-2 uppercase italic">Our Services</h2>
                        <div className="w-24 h-2 bg-secondary"></div>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((s, idx) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="overflow-hidden bg-white border-2 border-gray-50 rounded-[3rem] hover:border-primary transition group hover:shadow-2xl flex flex-col"
                            >
                                {/* Service Image Header */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={getServiceImage(s.title)}
                                        alt={s.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="p-10 pt-8">
                                    <h3 className="text-xl font-black mb-3 text-secondary uppercase leading-none">{s.title}</h3>
                                    <p className="text-gray-400 font-medium text-sm leading-relaxed">{s.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <AboutUs />


                {/* Destinations */}
                <section id="destinations" className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <span className="text-secondary font-black uppercase tracking-widest text-sm mb-2 block">Global Opportunities</span>
                        <h2 className="text-3xl md:text-4xl font-black text-primary uppercase italic">Explore Destinations</h2>
                        <div className="w-24 h-2 bg-secondary mx-auto mt-4"></div>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {countries.map((c, idx) => {
                            const lookupName = c.name.toLowerCase().trim();
                            const bgImages: Record<string, string> = {
                                'australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
                                'uk': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
                                'united kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
                                'canada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800',
                                'germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
                                'usa': 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800'
                            };
                            const flags: Record<string, string> = {
                                'australia': 'au',
                                'uk': 'gb',
                                'united kingdom': 'gb',
                                'canada': 'ca',
                                'germany': 'de',
                                'usa': 'us'
                            };
                            const bgImg = bgImages[lookupName] || 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800';
                            const flagCode = flags[lookupName] || 'un';

                            return (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="relative h-[450px] rounded-[2.5rem] overflow-hidden group shadow-2xl cursor-pointer bg-primary"
                                    onClick={() => setSelectedCountry(c)}
                                >
                                    {/* Using <img> tag instead of background-image for maximum reliability */}
                                    <img
                                        src={bgImg}
                                        alt={c.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent transition-opacity group-hover:opacity-80"></div>

                                    <div className="absolute top-6 right-6">
                                        <img
                                            src={`https://flagcdn.com/w80/${flagCode}.png`}
                                            alt="flag"
                                            className="w-10 rounded shadow-md border border-white/20"
                                        />
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <h3 className="text-3xl font-black text-white uppercase italic mb-2 tracking-tight">{c.name}</h3>
                                        <p className="text-white/80 text-sm font-bold line-clamp-2 mb-6 uppercase tracking-wider leading-relaxed">{c.description}</p>
                                        <div className="flex items-center gap-3 text-secondary font-black uppercase text-xs tracking-[0.2em]">
                                            <span>Discover More</span>
                                            <div className="w-8 h-1 bg-secondary group-hover:w-12 transition-all"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                <PartnerLogos universities={universities} />
                {/* Test Prep */}
                <section id="test-prep" className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center mb-16 text-center"
                    >
                        <span className="text-secondary font-black uppercase tracking-tighter mb-2 italic">Acing the Exams</span>
                        <h2 className="text-3xl md:text-4xl font-black text-primary uppercase italic">Test Preparation</h2>
                        <div className="w-40 h-2 bg-secondary mt-4"></div>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testPrep.map((t, idx) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                whileHover={{ y: -15 }}
                                className="relative group overflow-hidden bg-white border-4 border-gray-50 rounded-[3rem] p-10 hover:border-primary transition-all hover:shadow-2xl flex flex-col justify-between"
                            >
                                <div className="absolute top-0 left-0 w-2 h-full bg-secondary transition-all group-hover:w-4"></div>
                                <div>
                                    <h3 className="text-3xl font-black text-primary mb-4 italic group-hover:text-secondary transition-colors">{t.name}</h3>
                                    <p className="text-gray-500 font-medium mb-4 leading-relaxed line-clamp-4">{t.description}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const testType = t.name.split(' ')[0]; // E.g. "IELTS" from "IELTS Preparation"
                                        setModalData({ test: testType });
                                        setIsModalOpen(true);
                                    }}
                                    className="mt-6 w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary transition shadow-lg group-hover:-translate-y-1"
                                >
                                    Enrol Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <Testimonials />
                {/* Blog */}
                <section id="blog" className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase italic leading-none">Latest News</h2>
                            <div className="w-20 h-2 bg-secondary mt-4"></div>
                        </div>
                        <Link href="/blog" className="text-secondary font-black uppercase text-sm border-b-4 border-secondary hover:text-primary hover:border-primary transition-colors">All Posts</Link>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {blogs.map((b, idx) => (
                            <Link key={b.id} href={`/blog/${b.slug}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white h-full rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-primary transition group shadow-sm hover:shadow-lg flex flex-col cursor-pointer"
                                >
                                    {/* Blog Image Header */}
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={b.image || getBlogPlaceholder(b.title)}
                                            alt={b.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-0 left-0 w-full h-2 bg-primary group-hover:bg-secondary transition-colors duration-300" />
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-black mb-4 text-gray-800 leading-tight group-hover:text-primary transition-colors uppercase italic flex-1">
                                            {b.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-medium line-clamp-3 leading-relaxed">
                                            {b.content}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>
                <FAQ />
                {/* Form */}
                <section id="contact" className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-left"
                    >
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4 block italic">Let's Talk</span>
                        <h2 className="text-4xl md:text-6xl font-black text-primary leading-[0.9] uppercase mb-8 italic tracking-tighter">
                            Start Your <br /><span className="text-secondary">Journey</span>
                        </h2>
                        <p className="text-lg text-gray-400 font-medium mb-12 max-w-md leading-relaxed">
                            Our expert consultants are ready to guide you through every step of your international education.
                        </p>

                        <div className="space-y-10">
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-primary uppercase text-sm tracking-widest mb-1">Our Offices</h4>
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">Kathmandu, Nepal</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-primary uppercase text-sm tracking-widest mb-1">Direct Call</h4>
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">+977-9869314833</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-primary uppercase text-sm tracking-widest mb-1">Email Inquiry</h4>
                                    <p className="text-gray-400 font-bold text-xs tracking-wider">info@eliteabroad.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[3rem] border-4 border-primary shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
                        <AnimatePresence>
                            {formStatus.message && (
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="mb-8 p-4 bg-secondary/10 text-secondary rounded-2xl text-center font-black uppercase italic"
                                >
                                    {formStatus.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.input whileFocus={{ scale: 1.02 }} type="text" placeholder="YOUR NAME" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20 transition-all" />
                            <motion.input whileFocus={{ scale: 1.02 }} type="email" placeholder="YOUR EMAIL" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20 transition-all" />
                            <motion.input whileFocus={{ scale: 1.02 }} type="text" placeholder="PHONE NUMBER" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20 transition-all" />
                            <motion.textarea whileFocus={{ scale: 1.02 }} placeholder="HOW CAN WE HELP?" rows={4} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20 transition-all" />
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition shadow-xl uppercase"
                            >
                                Submit Inquiry
                            </motion.button>
                        </form>
                    </motion.div>
                </section>
            </div >

            {/* University Modal */}
            {
                selectedCountry && (
                    <div className="fixed inset-0 bg-primary/20 backdrop-blur-md z-50 flex items-center justify-center p-6">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border-4 border-primary animate-in fade-in zoom-in duration-300">
                            <div className="bg-primary p-8 flex justify-between items-center text-white">
                                <div>
                                    <h3 className="text-3xl font-black uppercase italic">Universities in</h3>
                                    <p className="text-secondary font-black text-xl">{selectedCountry.name}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedCountry(null)}
                                    className="bg-white/20 hover:bg-white/40 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-8 max-h-[60vh] overflow-y-auto">
                                {selectedCountry && universities.filter(u => u.country === selectedCountry.id).length > 0 ? (
                                    <div className="grid gap-4">
                                        {universities
                                            .filter(u => u.country === (selectedCountry?.id))
                                            .map(u => (
                                                <div key={u.id} className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary/5 transition group">
                                                    <span className="font-black text-primary group-hover:text-secondary transition-colors">{u.name}</span>
                                                    {u.website && (
                                                        <a
                                                            href={u.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-secondary text-white text-[10px] font-black py-2 px-4 rounded-full uppercase hover:bg-orange-600 transition"
                                                        >
                                                            Visit Site
                                                        </a>
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-400 font-bold uppercase italic">No universities listed yet for this destination.</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 bg-gray-50 flex justify-center">
                                <button
                                    onClick={() => setSelectedCountry(null)}
                                    className="bg-primary text-white px-10 py-3 rounded-full font-black uppercase hover:bg-blue-500 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                countries={countries}
                initialData={modalData}
            />
        </div>
    );
}
