import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Elite Abroad Counselling | Your Gateway to Global Education",
    description: "Expert counselling and visa assistance for students wishing to study in Australia, UK, Canada, and Germany.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased text-gray-900" suppressHydrationWarning>
                <Navbar />
                {children}
                <footer className="bg-gray-100 py-12 border-t">
                    <div className="container mx-auto px-4 text-center text-gray-500">
                        <p>© {new Date().getFullYear()} Elite Abroad Counselling. All rights reserved.</p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
