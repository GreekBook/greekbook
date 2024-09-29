import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card";
import {Calendar, MapPin, Users} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Event} from "@/lib/db/schema";

export default function FeaturedEventCard({event}: {event: Event}) {
    return (
        <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src={event.image}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                />
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                    Featured
                </Badge>
            </div>
            <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{event.startDate.getDate()} at {event.startDate.getTime()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={""} alt={""} />
                            <AvatarFallback>{""}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium truncate">{"NAME"}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{200}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                    <Link href={`/events/${event.id}`}>View Event</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}