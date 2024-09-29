'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Search, MapPin, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function TicketsPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const tickets = [
        {
            id: 1,
            title: "Alpha Beta Gamma Mixer",
            image: "/placeholder.svg?height=100&width=100",
            location: "Alpha Beta Gamma House",
            date: "May 15, 2023",
            time: "8:00 PM",
            ticketType: "General Admission"
        },
        {
            id: 2,
            title: "Delta Epsilon Spring Formal",
            image: "/placeholder.svg?height=100&width=100",
            location: "Grand Ballroom",
            date: "May 20, 2023",
            time: "7:00 PM",
            ticketType: "VIP"
        },
        {
            id: 3,
            title: "Zeta Eta Beach Party",
            image: "/placeholder.svg?height=100&width=100",
            location: "Zeta Eta House",
            date: "June 5, 2023",
            time: "2:00 PM",
            ticketType: "General Admission"
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="flex items-center p-4 bg-card border-b border-border">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-semibold ml-4">My Tickets</h1>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search your tickets"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <Card key={ticket.id}>
                            <CardContent className="p-4 flex">
                                <Image
                                    src={ticket.image}
                                    alt={ticket.title}
                                    width={100}
                                    height={100}
                                    className="w-24 h-24 object-cover rounded-lg mr-4"
                                />
                                <div className="flex-grow">
                                    <CardTitle className="text-lg">{ticket.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                                        <MapPin className="w-4 h-4 mr-1" /> {ticket.location}
                                    </p>
                                    <div className="mt-2 flex flex-col space-y-1">
                                        <Badge variant="secondary" className="w-fit flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" /> {ticket.date}, {ticket.time}
                                        </Badge>
                                        <Badge variant="outline" className="w-fit">
                                            {ticket.ticketType}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">View Ticket</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}