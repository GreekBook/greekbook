'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Plus, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function OrgsPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const organizations = [
        {
            id: 1,
            name: "Alpha Beta Gamma",
            image: "/placeholder.svg?height=100&width=100",
            memberCount: 120,
            role: "Member"
        },
        {
            id: 2,
            name: "Delta Epsilon Fraternity",
            image: "/placeholder.svg?height=100&width=100",
            memberCount: 85,
            role: "President"
        },
        {
            id: 3,
            name: "Zeta Eta Sorority",
            image: "/placeholder.svg?height=100&width=100",
            memberCount: 95,
            role: "Social Chair"
        },
        {
            id: 4,
            name: "Theta Iota Kappa",
            image: "/placeholder.svg?height=100&width=100",
            memberCount: 110,
            role: "Member"
        },
        {
            id: 5,
            name: "Lambda Mu Nu",
            image: "/placeholder.svg?height=100&width=100",
            memberCount: 75,
            role: "Treasurer"
        }
    ]

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background border-b border-border">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">My Organizations</h1>
                    </div>
                    <Link href="/organizations/create">
                        <Button>
                            <Plus className="h-5 w-5 mr-2" />
                            New
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search organizations"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {organizations.map((org) => (
                            <Link href={`/organizations/${org.id}`} key={org.id} className="block">
                                <Card className="transition-all hover:shadow-md hover:bg-accent hover:text-accent-foreground">
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={org.image} alt={org.name} />
                                                <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold">{org.name}</h3>
                                                <p className="text-sm text-muted-foreground">{org.memberCount} members</p>
                                                <Badge variant="secondary" className="mt-2">{org.role}</Badge>
                                            </div>
                                            <ChevronRight className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}