import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
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
        <html lang="en" className="scroll-smooth">
            <body className="antialiased text-gray-900 bg-white" suppressHydrationWarning>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <BackToTop />
                <Footer />
            </body>
        </html>
    );
}
