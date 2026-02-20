'use client';

import { useEffect, useState, useRef } from 'react';
import { School, FileCheck, GraduationCap, FileSignature, Coins, X } from 'lucide-react';

const getServiceIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('university') || t.includes('selection')) return <School className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    if (t.includes('visa')) return <FileCheck className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    if (t.includes('scholarship')) return <Coins className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    if (t.includes('application')) return <FileSignature className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
    return <GraduationCap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />;
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

export default function Home() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [universities, setUniversities] = useState<University[]>([]);
    const [testPrep, setTestPrep] = useState<TestPrep[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cRes, sRes, bRes, uRes, tRes] = await Promise.all([
                    fetch('http://localhost:8000/api/countries/'),
                    fetch('http://localhost:8000/api/services/'),
                    fetch('http://localhost:8000/api/blog/'),
                    fetch('http://localhost:8000/api/universities/'),
                    fetch('http://localhost:8000/api/test-prep/')
                ]);

                if (!cRes.ok || !sRes.ok || !bRes.ok || !uRes.ok || !tRes.ok) {
                    console.error('Response Error:', {
                        countries: cRes.status,
                        services: sRes.status,
                        blog: bRes.status,
                        universities: uRes.status,
                        testPrep: tRes.status
                    });
                    throw new Error('Failed to fetch data from backend');
                }

                setCountries(await cRes.json());
                setServices(await sRes.json());
                setBlogs(await bRes.json());
                setUniversities(await uRes.json());
                setTestPrep(await tRes.json());
                setError(null);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Could not connect to the backend server. Please ensure it is running at http://localhost:8000');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus({ type: null, message: 'Sending...' });
        try {
            const res = await fetch('http://localhost:8000/api/inquiries/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormStatus({ type: 'success', message: 'Sent! We will contact you soon.' });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setFormStatus({ type: 'error', message: 'Error sending message.' });
            }
        } catch {
            setFormStatus({ type: 'error', message: 'Server connection failed.' });
        }
    };

    return (
        <div className="bg-white">
            <section className="bg-white border-b-8 border-secondary py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 transform translate-x-20"></div>
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
                    <span className="text-secondary font-black tracking-widest uppercase mb-4 text-2xl">"Your Abroad Partner"</span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 text-primary leading-tight">Elite Abroad <br /><span className="text-secondary">Counselling</span></h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">Empowering your dreams with expert guidance for education in top global destinations.</p>
                    <div className="flex justify-center gap-4">
                        <a href="#contact" className="bg-secondary text-white px-10 py-4 rounded-full font-black text-lg hover:bg-orange-600 transition shadow-xl uppercase outline-none">Start Now</a>
                        <a href="#destinations" className="bg-primary text-white px-10 py-4 rounded-full font-black text-lg hover:bg-blue-500 transition shadow-xl uppercase outline-none">Explore</a>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-20">
                {error && (
                    <div className="mb-8 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-2xl text-center font-black uppercase italic">
                        {error}
                    </div>
                )}
                {/* Services */}
                <section id="services" className="mb-32">
                    <div className="text-left mb-16">
                        <h2 className="text-4xl font-black text-primary mb-2 uppercase italic">Our Services</h2>
                        <div className="w-24 h-2 bg-secondary"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map(s => (
                            <div key={s.id} className="p-8 border-2 border-gray-50 rounded-3xl hover:border-primary transition group hover:shadow-2xl">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-primary transition-all duration-300 group-hover:rotate-6 shadow-sm">
                                    {getServiceIcon(s.title)}
                                </div>
                                <h3 className="text-xl font-black mb-3 text-secondary uppercase">{s.title}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">{s.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Destinations */}
                <section id="destinations" className="mb-32 bg-primary/5 p-12 rounded-[3rem]">
                    <div className="mb-16">
                        <h2 className="text-4xl font-black text-primary mb-2 uppercase italic text-left">Study Destinations</h2>
                        <div className="w-24 h-2 bg-secondary mb-4"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {countries.map(c => (
                            <div key={c.id} className="bg-white p-8 rounded-[2rem] h-80 flex flex-col justify-between border-4 border-white shadow-lg hover:border-secondary transition-all group">
                                <div>
                                    <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">{c.name}</h3>
                                    <p className="text-gray-500 text-xs mt-4 line-clamp-4 font-bold uppercase leading-5">{c.description}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedCountry(c)}
                                    className="bg-primary text-white text-[10px] font-black py-2 px-4 rounded-full w-fit uppercase tracking-widest group-hover:bg-secondary transition-colors"
                                >
                                    Find Universities
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Test Prep */}
                <section id="test-prep" className="mb-32">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="text-secondary font-black uppercase tracking-tighter mb-2 italic">Acing the Exams</span>
                        <h2 className="text-5xl font-black text-primary uppercase italic">Test Preparation</h2>
                        <div className="w-40 h-2 bg-secondary mt-4"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testPrep.map(t => (
                            <div key={t.id} className="relative group overflow-hidden bg-white border-4 border-gray-50 rounded-[3rem] p-10 hover:border-primary transition-all hover:shadow-2xl flex flex-col justify-between h-[480px]">
                                <div className="absolute top-0 left-0 w-2 h-full bg-secondary transition-all group-hover:w-4"></div>
                                <div>
                                    <h3 className="text-3xl font-black text-primary mb-4 italic group-hover:text-secondary transition-colors">{t.name}</h3>
                                    <p className="text-gray-500 font-medium mb-8 leading-relaxed line-clamp-3">{t.description}</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xs italic">Time</div>
                                            <span className="font-black text-gray-700 uppercase tracking-widest text-sm">{t.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black uppercase text-xs italic">Fee</div>
                                            <span className="font-black text-secondary tracking-widest text-sm">NPR {t.fee}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-10 w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary transition shadow-lg group-hover:-translate-y-1">
                                    Enrol Now
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Blog */}
                <section id="blog" className="mb-32">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-black text-primary uppercase italic leading-none">Latest News</h2>
                            <div className="w-20 h-2 bg-secondary mt-4"></div>
                        </div>
                        <a href="#blog" className="text-secondary font-black uppercase text-sm border-b-4 border-secondary">All Posts</a>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {blogs.map(b => (
                            <div key={b.id} className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-primary transition">
                                <div className="h-4 bg-primary"></div>
                                <div className="p-8">
                                    <p className="text-secondary text-xs font-black mb-4 uppercase tracking-tighter italic">{b.published_date.split('T')[0]}</p>
                                    <h3 className="text-2xl font-black mb-4 text-gray-800 leading-tight">{b.title}</h3>
                                    <p className="text-gray-400 text-sm font-medium line-clamp-3">{b.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form */}
                <section id="contact" className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-6xl font-black text-primary leading-none uppercase mb-8 italic text-left">Get in <br /><span className="text-secondary">Touch</span></h2>
                        <p className="text-xl text-gray-400 font-bold mb-10">Connect with Elite Abroad Counselling and let us guide you to the right path.</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-primary font-black"><span className="text-2xl">📞</span> +977 1XXXXXXXXX</div>
                            <div className="flex items-center gap-4 text-primary font-black"><span className="text-2xl">📧</span> info@eliteabroad.com</div>
                        </div>
                    </div>
                    <div className="bg-white p-12 rounded-[3rem] border-4 border-primary shadow-2xl">
                        {formStatus.message && <div className="mb-8 p-4 bg-secondary/10 text-secondary rounded-2xl text-center font-black uppercase italic">{formStatus.message}</div>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" placeholder="YOUR NAME" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20" />
                            <input type="email" placeholder="YOUR EMAIL" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20" />
                            <input type="text" placeholder="PHONE NUMBER" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20" />
                            <textarea placeholder="HOW CAN WE HELP?" rows={4} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/20" />
                            <button className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition shadow-xl uppercase">Submit Inquiry</button>
                        </form>
                    </div>
                </section>
            </div>

            {/* University Modal */}
            {selectedCountry && (
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
                            {universities.filter(u => u.country === selectedCountry.id).length > 0 ? (
                                <div className="grid gap-4">
                                    {universities
                                        .filter(u => u.country === selectedCountry.id)
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
            )}

        </div>
    );
}
