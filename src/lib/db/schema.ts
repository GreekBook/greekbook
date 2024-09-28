import {serial, text, timestamp, pgTable, uniqueIndex, uuid, primaryKey} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    role: text("role").$type<"admin" | "user">().notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
}, (users) => {
    return {
        emailIndex: uniqueIndex("email_index").on(users.email),
        idIndex: uniqueIndex("id_index").on(users.id),
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
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
    usersToOrganizations: many(usersToOrganizations),
}));

// End Orgs --------------------

export const roles = pgTable('roles', {
    organizationId: uuid('organization_id').notNull().references(() => organizations.id),
    name: text('name').notNull(),
    permissions: text('permissions').array().default(sql`'{}'::text[]`).notNull(),
});

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

export const usersToGroupsRelations = relations(usersToOrganizations, ({ one }) => ({
    group: one(organizations, {
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
    ownerId: serial('owner_id').references(() => organizations.id).notNull(),
});
