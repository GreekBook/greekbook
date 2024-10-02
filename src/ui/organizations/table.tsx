import {fetchMyFilteredOrganizations} from "@/lib/db/data";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {ChevronRight} from "lucide-react";

export default async function Table({query, currentPage}: {
    query: string;
    currentPage: number;
}) {

    const organizations = await fetchMyFilteredOrganizations(query, currentPage);
    if (!organizations) return (<></>);

    return (
        <div className="space-y-4">
            {organizations.map((org) => (
                <Link href={`/organizations/${org.organization.id}`} key={org.organization.id} className="block">
                    <Card
                        className="transition-all hover:shadow-md hover:bg-accent hover:text-accent-foreground">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={org.organization.image} alt={org.organization.name}/>
                                    <AvatarFallback>{org.organization.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{org.organization.name}</h3>
                                    <p className="text-sm text-muted-foreground">{org.organization.members.length} members</p>
                                    <Badge variant="secondary" className="mt-2">{org.role}</Badge>
                                </div>
                                <ChevronRight className="h-6 w-6 text-muted-foreground"/>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}