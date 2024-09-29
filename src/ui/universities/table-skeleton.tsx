import {Skeleton} from "@/components/ui/skeleton";

export default function TableSkeleton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-[250px]"/>
            <Skeleton className="h-4 w-[250px]"/>
            <Skeleton className="h-4 w-[250px]"/>
        </div>
    )
}