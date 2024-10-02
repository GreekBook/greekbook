import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import React from "react";
import Navbar from "@/components/navbar";
import {MuseoModerno} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const museoModerno = MuseoModerno({
    subsets: ['latin'],
    variable: '--font-museo-moderno',
});

export const metadata: Metadata = {
    title: "Vibepass",
    description: "Next generation app for college social events.",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <title>Vibepass</title>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${museoModerno.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col">
                        {children}
                        <Navbar/>
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}