import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 h-24 flex items-center justify-between">
                {/* Logo on the Left */}
                <Link href="/" className="flex items-center">
                    <div className="w-64 h-20 flex items-center">
                        <img
                            src="/logo.png"
                            alt="Elite Abroad Counselling Logo"
                            className="max-h-full object-contain"
                        />
                    </div>
                </Link>

                {/* Grouping Links and Button on the Right */}
                <div className="hidden md:flex items-center space-x-10">
                    <div className="flex space-x-8 font-bold text-gray-700">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link href="#destinations" className="hover:text-primary transition-colors">Destinations</Link>
                        <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
                        <Link href="#blog" className="hover:text-primary transition-colors">Blog</Link>
                    </div>

                    <Link href="#contact" className="bg-secondary text-white px-8 py-3 rounded-full font-black hover:bg-orange-600 transition-all shadow-lg active:scale-95 uppercase text-sm">
                        Consult Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
