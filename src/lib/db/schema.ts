import {
    text,
    timestamp,
    pgTable,
    uniqueIndex,
    primaryKey,
    boolean,
    numeric,
    integer
} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters"

export const user = pgTable("user", {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    onboarded: boolean("onboarded").default(false).notNull(),
    role: text("role").$type<"admin" | "user">().default("user").notNull(),
    dateOfBirth: timestamp("date_of_birth"),
    kycVerified: boolean("kyc_verified").default(false),
}, (users) => {
    return {
        emailIndex: uniqueIndex("user_email_index").on(users.email),
    }
});

export const usersRelations = relations(user, ({ many }) => ({
    usersToGroups: many(usersToOrganizations),
}));

export type User = typeof user.$inferSelect; // return type when queried
export type NewUser = typeof user.$inferInsert; // insert type

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
)

// End users --------------------

export const organizations = pgTable('organizations', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull().notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ownerId: text('owner_id').references(() => user.id).notNull(),
    universityId: text('university_id').references(() => universities.id).notNull(),
}, (organizations) => ({
    nameIndex: uniqueIndex('organization_name_index').on(organizations.name),
}));

export const organizationsRelations = relations(organizations, ({ many, one }) => ({
    usersToOrganizations: many(usersToOrganizations),
    roles: many(roles),
    university: one(universities, {
        fields: [organizations.universityId],
        references: [universities.id],
    }),
}));

// End Orgs --------------------

export const roles = pgTable('roles', {
    organizationId: text('organization_id').notNull().references(() => organizations.id).primaryKey(),
    name: text('name').notNull(),
    permissions: text('permissions').array().default(sql`'{}'::text[]`).notNull(),
});

export const rolesRelations = relations(roles, ({ one }) => ({
    organization: one(organizations, {
        fields: [roles.organizationId],
        references: [organizations.id],
    }),
}));

// End Roles
export const usersToOrganizations = pgTable(
    'users_to_organizations',
    {
        userId: text('user_id')
            .notNull()
            .references(() => user.id),
        organizationId: text('organization_id')
            .notNull()
            .references(() => organizations.id),
        role: text('role').$type<'admin' | 'member'>().notNull(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.organizationId] }),
    }),
);

export const usersToOrganizationsRelations = relations(usersToOrganizations, ({ one }) => ({
    organization: one(organizations, {
        fields: [usersToOrganizations.organizationId],
        references: [organizations.id],
    }),
    user: one(user, {
        fields: [usersToOrganizations.userId],
        references: [user.id],
    }),
}));

// End users to groups --------------------

export const events = pgTable('events', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    location: text('location'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    organizationId: text('organization_id').references(() => organizations.id).notNull(),
    universityId: text('university_id').references(() => universities.id).notNull(),
    paid: boolean('paid').default(false).notNull(),
    attendeesCapped: boolean('attendees_capped').default(false).notNull(),
    price: numeric('price'),
    maxAttendees: numeric('max_attendees'),
    images: text('images').array().default(sql`'{}'::text[]`).notNull(),
    tags: text('tags').array().default(sql`'{}'::text[]`).notNull(),
    status: text('status').$type<'draft' | 'published' | 'past'>().notNull(),
});

export const eventsRelations = relations(events, ({ one }) => ({
    organization: one(organizations, {
        fields: [events.organizationId],
        references: [organizations.id],
    }),
    university: one(universities, {
        fields: [events.universityId],
        references: [universities.id],
    }),
}));

// End Events --------------------

export const eventAttendees = pgTable(
    'event_attendees',
    {
        eventId: text('event_id').notNull().references(() => events.id),
        userId: text('user_id').notNull().references(() => user.id),
        status: text('status').$type<'ticket_online' | 'ticket_in_person' | 'list' | 'free-entry'>().notNull(),
        attended: boolean('attended').default(false).notNull(),
        checkedInAt: timestamp('checked_in_at'),
        createdAt: timestamp('created_at').notNull(),
    }, (t) => ({
        pk: primaryKey({ columns: [t.eventId, t.userId] }),
    }),
);

export const eventAttendeesRelations = relations(eventAttendees, ({ one }) => ({
    event: one(events, {
        fields: [eventAttendees.eventId],
        references: [events.id],
    }),
    user: one(user, {
        fields: [eventAttendees.userId],
        references: [user.id],
    }),
}));

// End Event Attendees --------------------

export const universities = pgTable('universities', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').unique().notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').notNull(),
    createdBy: text('created_by').references(() => user.id).notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    updatedBy: text('updated_by').references(() => user.id).notNull(),
    image: text('image').notNull(),
}, (universities) => ({
    nameIndex: uniqueIndex('university_name_index').on(universities.name),
}));

export const universitiesRelations = relations(universities, ({ many }) => ({
    organizations: many(organizations),
    events: many(events),
}));