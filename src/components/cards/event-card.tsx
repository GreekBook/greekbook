import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {ArrowUpRight, Calendar, MapPin, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {EventWithAttendees} from "@/lib/db/schema";

export default function EventCard({ event }: { event: EventWithAttendees}) {

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return (
        <Card key={event.id}>
            <CardContent className="p-0">
                <Image
                    src={event.image}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                    <CardTitle>{event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" /> {event.location}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Badge variant="secondary" className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" /> {formatDate(event.startDate)}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                                <Users className="w-4 h-4 mr-1" /> {event.attendees.length}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="font-bold text-lg">{event.price}</span>
                <Button>
                    View Event
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    )
}