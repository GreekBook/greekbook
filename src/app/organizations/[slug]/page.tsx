'use client'

import Link from 'next/link'
import {ArrowLeft, Settings, Plus, ChevronRight, UserPlus} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrganizationPage({ params }: { params: { slug: string } }) {
    console.log(params)
    // This would typically come from an API or database
    const organization = {
        name: "VibePass",
        description: "Owners of the damn app.",
        image: "https://vibepass-jviguy-vibepasseventimages-snwdomnu.s3.us-east-1.amazonaws.com/organization-images/VibePass/logo.png",
        memberCount: 1,
        eventCount: 3,
    }

    const members = [
        { id: 1, name: "Jeremy Ianne", role: "Owner", image: "/placeholder.svg?height=32&width=32" },
        // Add more members as needed
    ]

    const upcomingEvents = [
        { id: 1, title: "Grand Reveal", date: "Oct 5, 2024", attendees: 50 },
        { id: 2, title: "Red Carpet Debut", date: "Oct 15, 2024", attendees: 100 },
        { id: 3, title: "Million Dollar VC funding!", date: "Oct 20, 2024", attendees: 300 },
        // Add more events as needed
    ]

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <Link href="/organizations">
                        <Button variant="ghost" size="icon" className="mr-2">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">{organization.name}</h1>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={organization.image} alt={organization.name} />
                                <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{organization.name}</CardTitle>
                                <CardDescription>{organization.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{organization.memberCount} members</span>
                                <span>{organization.eventCount} events</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2.5">
                            <Button className="w-full">
                                <UserPlus className="mr-2 h-4 w-4" /> Invite Member
                            </Button>
                            <Button className="w-full">
                                <Plus className="mr-2 h-4 w-4" /> Create Event
                            </Button>
                        </CardFooter>
                    </Card>

                    <Tabs defaultValue="members">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="members">Members</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                        </TabsList>
                        <TabsContent value="members">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Members</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {members.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src={member.image} alt={member.name} />
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="events">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Events</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{event.title}</p>
                                                <p className="text-sm text-muted-foreground">{event.date}</p>
                                            </div>
                                            <Badge>{event.attendees} attendees</Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full justify-start">
                                <Settings className="mr-2 h-4 w-4" />
                                Organization Settings
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}