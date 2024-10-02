'use server';
import { Resource } from 'sst';
import {createOrgFormSchema} from "@/lib/forms/organizations";
import {db} from "@/lib/db/db";
import {NewOrganization, organizationMembers, organizations, roles} from "@/lib/db/schema";
import {auth} from "@/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function createOrganization(formData: FormData) {
    const session = await auth();
    if (!session) {
        return {
            errors: {
                auth: "You must be logged in to create an organization.",
            },
        }
    }
    const user = session.user;
    if (!user) {
        return {
            errors: {
                auth: "You must be logged in to create an organization.",
            },
        }
    }
    if (!user.id) {
        return {
            errors: {
                auth: "ID Missing what bs did u do.",
            },
        }
    }
    const object = Object.fromEntries(formData);
    const validatedFields = createOrgFormSchema.safeParse(object);
    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    console.log(validatedFields.data.image);
    const arrayBuffer = await validatedFields.data.image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    // First we need to upload image to s3 bucket.
    const command = new PutObjectCommand({
        Key: "organization-images/" + validatedFields.data.name + "/" + validatedFields.data.image.name,
        Body: buffer,
        Bucket: Resource.VibePassEventImages.name
    });
    const client = new S3Client({ region: "us-east-1" });
    await client.send(command);
    const newOrganization: NewOrganization = {
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        ownerId: user.id,
        ...validatedFields.data,
        image: "https://" + Resource.VibePassEventImages.name + ".s3.us-east-1.amazonaws.com/organization-images/" + validatedFields.data.name + "/" + validatedFields.data.image.name,
    };
    const realOrganizationData = await db.insert(organizations).values(newOrganization).returning();
    // create default role for owner.
    await db.insert(roles).values({
        organizationId: realOrganizationData[0].id,
        name: "Owner",
        permissions: ["all"],
    }).execute();
    // add user to organization.
    await db.insert(organizationMembers).values({
        userId: user.id,
        organizationId: realOrganizationData[0].id,
        role: "Owner",
    }).execute();
    return {
        errors: null,
    }
}