import {db} from "@/lib/db/db";

export async function searchUniversities(term: string) {
    try {
        return await db.query.universities.findMany({
            where: (universities, {ilike}) => ilike(universities.name, `%${term}%`),
            limit: 5,
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}