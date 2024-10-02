import {db} from "@/lib/db/db";
import {auth} from "@/auth";

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
                attendees: true,
                organization: true,
            },
            limit: 5,
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch most recently featured events.');
    }
}

export async function fetchEventPages(query: string, universityId: string, pageSize: number) {
    try {
        const results = await db.query.events.findMany({
            where: (events, { or, and, ilike, eq }) =>
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
        });
        return Math.ceil(Number(results.length) / pageSize);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the totalCount of event pages based on search.');
    }
}

export async function fetchFilteredEvents(query: string, page: number, universityId: string) {
    try {
        return await db.query.events.findMany({
            where: (events, { or, and, ilike, eq }) =>
                and(
                    or(
                        or(ilike(events.title, `%${query}%`), ilike(events.location, `%${query}%`)),
                        ilike(events.description, `%${query}%`)
                    ),
                    eq(events.universityId, universityId)
                ),
            with: {
              attendees: true,
            },
            limit: 5,
            offset: (page - 1) * 5,
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest events with filters.');
    }
}

export async function fetchMyFilteredEventsTickets(query: string, page: number) {
    const userSess = await auth();
    if (!userSess) {
        return [];
    }
    if (!userSess.user) {
        return [];
    }
    if (userSess.user.id == undefined) {
        return [];
    }
    const userId = userSess.user.id;
    try {
        return await db.query.eventAttendees.findMany({
            with: {
                event: {
                    // @ts-expect-error - This is a valid query and some bs with drizzle ts.
                    where: (events, {or, ilike}) =>
                        or(
                            or(ilike(events.title, `%${query}%`), ilike(events.location, `%${query}%`)),
                            ilike(events.description, `%${query}%`)
                        ),
                }
            },
            where: (eventAttendees, { eq }) => eq(eventAttendees.userId, userId),
            limit: 5,
            offset: (page - 1) * 5,
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the tickets based on search.');
    }
}

export async function fetchMyEventPages(query: string, pageSize: number) {
    const userSess = await auth();
    if (!userSess) {
        return 0;
    }
    if (!userSess.user) {
        return 0;
    }
    if (userSess.user.id == undefined) {
        return 0;
    }
    const userId = userSess.user.id;
    try {
        const results = await db.query.eventAttendees.findMany({
            with: {
                event: {
                    // @ts-expect-error - This is a valid query and some bs with drizzle ts.
                    where: (events, {or, ilike}) =>
                        or(
                            or(ilike(events.title, `%${query}%`), ilike(events.location, `%${query}%`)),
                            ilike(events.description, `%${query}%`)
                        ),
                }
            },
            where: (eventAttendees, { eq }) => eq(eventAttendees.userId, userId),
        });
        return Math.ceil(Number(results.length) / pageSize);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the totalCount of tickets based on search.');
    }
}

export async function fetchMyFilteredOrganizationsPages(query: string, universityId: string, pageSize: number) {
    const userSess = await auth();
    if (!userSess) {
        return [];
    }
    if (!userSess.user) {
        return [];
    }
    if (userSess.user.id == undefined) {
        return [];
    }
    const userId = userSess.user.id;
    try {
        const results = await db.query.organizationMembers.findMany({
            with: {
                organization: {
                    // @ts-expect-error - This is a valid query and some bs with drizzle ts.
                    where: (events, {or, ilike}) =>
                        or(
                            or(ilike(events.title, `%${query}%`), ilike(events.location, `%${query}%`)),
                            ilike(events.description, `%${query}%`)
                        ),
                }
            },
            where: (usersToOrganizations, { eq }) => eq(usersToOrganizations.userId, userId),
        });
        return Math.ceil(Number(results.length) / pageSize);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the totalCount of organizations based on search.');
    }
}

export async function fetchMyFilteredOrganizations(query: string, page: number) {
    const userSess = await auth();
    if (!userSess) {
        return null;
    }
    if (!userSess.user) {
        return null;
    }
    if (userSess.user.id == undefined) {
        return null;
    }
    const userId = userSess.user.id;
    try {
        return await db.query.organizationMembers.findMany({
            with: {
                organization: {
                    with: {
                        members: true,
                    }
                },
            },
            where: (usersToOrganizations, { eq }) => eq(usersToOrganizations.userId, userId),
            limit: 5,
            offset: (page - 1) * 5,
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch organizations based on search.');
    }
}

export async function fetchProfile() {
    const userSess = await auth();
    if (!userSess) {
        return null;
    }
    if (!userSess.user) {
        return null;
    }
    if (userSess.user.id == undefined) {
        return null;
    }
    const userId = userSess.user.id;
    try {
        return await db.query.users.findFirst({
            where: (users, {eq}) => eq(users.id, userId),
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user profile.');
    }
}