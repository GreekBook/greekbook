import {db} from "@/lib/db/db";
import {arrayOverlaps} from "drizzle-orm";

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

export async function getMostRecentlyFeaturedEvents() {
    try {
        return await db.query.events.findMany({
            orderBy: (events, { asc }) => [asc(events.featuredAt)],
            with: {
                attendees: {}
            },
            limit: 5,
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function fetchEventPages(query: string, page: number, universityId: string, pageSize: number) {
    const split = query.split(' ');
    if (split.length === 1 && split[0].length === 0) {
        split[0] = "party";
        split.push("social");
    }
    console.log(split);
    try {
        const results = await db.query.events.findMany({
            where: (events, { or, and, ilike, eq }) =>
                or(
                    and(
                        or(
                            or(
                                ilike(events.title, `%${query}%`),
                                ilike(events.location, `%${query}%`)
                            ),
                            ilike(events.description, `%${query}%`)
                        ),
                        eq(events.universityId, universityId)
                    ),
                    arrayOverlaps(events.tags, split)
                )
        });
        return Math.ceil(Number(results.length) / pageSize);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the totalCount of event pages based on search.');
    }
}

export async function fetchFilteredEvents(query: string, page: number, universityId: string) {
    try {
        const split = query.split(' ');
        if (split.length === 1 && split[0].length === 0) {
            split[0] = "party";
            split.push("social");
        }
        return await db.query.events.findMany({
            where: (events, { or, and, ilike, eq }) =>
                or(
                    and(
                        or(
                            or(ilike(events.title, `%${query}%`), ilike(events.location, `%${query}%`)),
                            ilike(events.description, `%${query}%`)
                        ),
                        eq(events.universityId, universityId)
                    ),
                    arrayOverlaps(events.tags, ['test', 'test'])
                ),
            with: {
              attendees: true,
            },
            limit: 5,
            offset: (page - 1) * 5,
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}