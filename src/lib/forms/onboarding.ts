import {z} from "zod";

export const onboardingForm = z.object({
    name: z.string().min(2).max(50),
    dateOfBirth: z.string().date(),
})