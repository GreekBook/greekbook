import {searchUniversities} from "@/lib/db/data";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import SelectButton from "@/ui/universities/select-button";

export default async function Table({query}: {
    query: string;
}) {
    const results = await searchUniversities(query);
    return (
        <div className="flex flex-col gap-2 justify-center">
            {results.map((university) => (
                <div key={university.id} className="flex flex-col gap-2">
                    <div className="w-[400px] h-[200px]">
                        <AspectRatio ratio={16 / 9}>
                            <Image src={university.image} alt="Image" className="rounded-md object-cover"/>
                        </AspectRatio>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <h2>{university.name}</h2>
                            <p>{university.description}</p>
                        </div>
                        <SelectButton university={university}/>
                    </div>
                </div>
            ))}
        </div>
    )
}