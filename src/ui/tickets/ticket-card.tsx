import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Calendar, MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {TicketWithEvent} from "@/lib/db/schema";

export default function TicketCard({ ticket }: {ticket: TicketWithEvent}) {
    return (
        <Card key={ticket.id}>
            <CardContent className="p-4 flex">
                <Image
                    src={ticket.event.image}
                    alt={ticket.event.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                    <CardTitle className="text-lg">{ticket.event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" /> {ticket.event.location}
                    </p>
                    <div className="mt-2 flex flex-col space-y-1">
                        <Badge variant="secondary" className="w-fit flex items-center">
                            <Calendar className="w-4 h-4 mr-1" /> {ticket.event.startDate}, time eventually.
                        </Badge>
                        <Badge variant="outline" className="w-fit">
                            {ticket.status}
                        </Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">View Ticket</Button>
            </CardFooter>
        </Card>
    )
}