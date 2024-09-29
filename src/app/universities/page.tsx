import {ChevronLeft} from "lucide-react";
import {Input} from "@/components/ui/input";

export default function UniversitySearchPage() {
    return (
        <div>
            <div className="flex-row">
                <ChevronLeft />
                <Input placeholder="Search for a university" />
            </div>
        </div>
    )
}