'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {Button} from "@/components/ui/button";
import {ChevronLeftIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            // eslint-disable-next-line drizzle/enforce-delete-with-where
            params.delete('query');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex flex-row gap-5 justify-center items-center">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ChevronLeftIcon className="h-4 w-4"/>
            </Button>
            <Input
                placeholder="Search for a university"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}