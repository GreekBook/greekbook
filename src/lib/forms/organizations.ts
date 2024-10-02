import { z } from "zod"
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createOrgFormSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
    image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
        .refine((file) => file?.length == 1, 'File is required.')
        .refine((file) => file[0].size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file[0].type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    universityId: z.string({
        required_error: "Please select a university.",
    }).uuid(),
});

export const createEventFormSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
    location: z.string().min(2).max(50),
    image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
        .refine((file) => file?.length == 1, 'File is required.')
        .refine((file) => file[0].size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file[0].type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    startDate: z.date(),
    endDate: z.date(),
    organizationId: z.string({
        required_error: "Please select an organization.",
    }).uuid(),
    paid: z.boolean(),
    attendeesCapped: z.boolean(),
    maxAttendees: z.number().int().min(1).max(1000),
    tags: z.string().min(2).max(10).array().max(5),
    status: z.enum(["draft", "published", "past"]),
    internal: z.boolean(),
});