import {serial, text, timestamp, pgTable, uniqueIndex, uuid, primaryKey, boolean, numeric} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    role: text("role").$type<"admin" | "user">().notNull(),
    dateOfBirth: timestamp("date_of_birth").notNull(),
    kycVerified: boolean("kyc_verified").default(false).notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
}, (users) => {
    return {
        emailIndex: uniqueIndex("email_index").on(users.email),
    }
});

export const usersRelations = relations(users, ({ many }) => ({
    usersToGroups: many(usersToOrganizations),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

// End users --------------------

export const organizations = pgTable('organizations', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ownerId: serial('owner_id').references(() => users.id).notNull(),
}, (organizations) => ({
    nameIndex: uniqueIndex('name_index').on(organizations.name),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
    usersToOrganizations: many(usersToOrganizations),
    roles: many(roles),
}));

// End Orgs --------------------

export const roles = pgTable('roles', {
    organizationId: uuid('organization_id').notNull().references(() => organizations.id).primaryKey(),
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
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),
        organizationId: uuid('organization_id')
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
    user: one(users, {
        fields: [usersToOrganizations.userId],
        references: [users.id],
    }),
}));

// End users to groups --------------------

export const events = pgTable('events', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    location: text('location'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    organizationId: serial('organization_id').references(() => organizations.id).notNull(),
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
}));

// End Events --------------------

export const eventAttendees = pgTable(
    'event_attendees',
    {
        eventId: uuid('event_id').notNull().references(() => events.id),
        userId: uuid('user_id').notNull().references(() => users.id),
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
    user: one(users, {
        fields: [eventAttendees.userId],
        references: [users.id],
    }),
}));

// End Event Attendees --------------------