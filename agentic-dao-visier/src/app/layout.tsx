import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./Providers";
import MinimalFloatingTopNav from "./ui/dashboard/floating-top-nav";
import SideNav from "@/app/ui/dashboard/sidenav";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Agentic DAO",
    description: "agentic dao.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AppProviders>
                    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                        <div className="w-full flex-none md:w-64">
                            <SideNav />
                        </div>
                        <div className="flex-grow p-6 md:overflow-y-auto md:p-12" >
                            {children}
                        </div>
                    </div>
                    <MinimalFloatingTopNav />
                </AppProviders>
            </body>
        </html>
    );
}
