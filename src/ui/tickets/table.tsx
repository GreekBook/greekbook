import TicketCard from "@/ui/tickets/ticket-card";
import {fetchMyFilteredEventsTickets} from "@/lib/db/data";

export default async function Table({query, currentPage}: {query: string, currentPage: number}) {
    const tickets = await fetchMyFilteredEventsTickets(query, currentPage)
    return (
            <div className="space-y-4">
            {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket}/>
            ))}
        </div>
    )
}