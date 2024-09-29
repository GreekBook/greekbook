'use client';

import Link from "next/link";
import {BriefcaseBusiness, Calendar, Home, Ticket, User} from "lucide-react";
import {usePathname} from "next/navigation";

export default function Navbar() {
    const pathName = usePathname();
    return (
        <footer className="sticky bottom-0 z-10 bg-background border-t border-border">
            <nav className="container mx-auto flex justify-around items-center py-2">
                <Link href="/" className={`flex flex-col items-center ${pathName == "/" ?
                    "text-teal-600" : "text-gray-500 dark:text-white"} transition-colors `}>
                    <Home className="w-6 h-6"/>
                    <span className="text-xs mt-1">Home</span>
                </Link>
                <Link href="/events" className={`flex flex-col items-center ${pathName == "/events" ?
                    "text-teal-600" : "text-gray-500 dark:text-white"} transition-colors `}>
                    <Calendar className="w-6 h-6"/>
                    <span className="text-xs mt-1">Events</span>
                </Link>
                <Link href="/tickets" className={`flex flex-col items-center ${pathName == "/tickets" ?
                    "text-teal-600" : "text-gray-500 dark:text-white"} transition-colors `}>
                    <Ticket className="w-6 h-6"/>
                    <span className="text-xs mt-1">Tickets</span>
                </Link>
                <Link href="/organizations" className={`flex flex-col items-center ${pathName == "/organizations" ?
                    "text-teal-600" : "text-gray-500 dark:text-white"} transition-colors `}>
                    <BriefcaseBusiness className="w-6 h-6"/>
                    <span className="text-xs mt-1">Orgs</span>
                </Link>
                <Link href="/profile" className={`flex flex-col items-center ${pathName == "/profile" ?
                    "text-teal-600" : "text-gray-500 dark:text-white"} transition-colors `}>
                    <User className="w-6 h-6"/>
                    <span className="text-xs mt-1">Profile</span>
                </Link>
            </nav>
        </footer>
    )
}