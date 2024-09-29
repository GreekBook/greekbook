'use client';

import {University} from "@/lib/db/schema";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function SelectButton({university}: {university: University}) {

    const router = useRouter()
    function handleClick() {
        // save preferred university into local storage.
        localStorage.setItem('preferredUniversity', university.id);
        router.push('/dashboard');
    }

    return (
        <Button variant="outline" onClick={handleClick}>Select</Button>
    )
}