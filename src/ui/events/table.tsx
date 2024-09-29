import EventCard from "@/components/cards/event-card";
import {fetchFilteredEvents} from "@/lib/db/data";

export default async function Table({query, currentPage, universityId}: {
    query: string;
    currentPage: number;
    universityId: string;
}) {
    const events = await fetchFilteredEvents(query, currentPage, universityId);

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <EventCard key={event.id} event={event}/>
            ))}
        </div>
    )
}