import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import FeaturedEventCard from "@/components/cards/featured-event-card";
import {getMostRecentlyFeaturedEvents} from "@/lib/db/data";
import {ModeToggle} from "@/components/theme-changer";

export default async function HomePage() {
    const featuredEvents = await getMostRecentlyFeaturedEvents();

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background border-b border-border">
                <div className={`container mx-auto px-4 py-4 flex justify-between items-center`}>
                    <h1 className="text-2xl font-bold text-teal-600 font-museo">VibePass</h1>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" aria-label="Notifications">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4 w-full text-center">Featured Events</h2>
                <div className="space-y-4">
                    {featuredEvents.map((event) => <FeaturedEventCard key={event.id} event={event} />)}
                </div>
            </main>
        </div>
    )
}