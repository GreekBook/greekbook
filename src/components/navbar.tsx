import Link from "next/link";
import {Calendar, Home, Ticket, User} from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-stone-900 p-2 z-10">
            <Link href="/" className="flex flex-col items-center text-teal-600">
                <Home className="w-6 h-6"/>
                <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/events" className="flex flex-col items-center text-gray-500 dark:text-white">
                <Calendar className="w-6 h-6 dark:text-white"/>
                <span className="text-xs mt-1">Events</span>
            </Link>
            <Link href="/tickets" className="flex flex-col items-center text-gray-500 dark:text-white">
                <Ticket className="w-6 h-6 dark:text-white"/>
                <span className="text-xs mt-1">Tickets</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-gray-500 dark:text-white">
                <User className="w-6 h-6 dark:text-white"/>
                <span className="text-xs mt-1">Profile</span>
            </Link>
        </nav>
    )
}