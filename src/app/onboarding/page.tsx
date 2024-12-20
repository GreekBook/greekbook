"use client"

import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {onboardingForm} from "@/lib/forms/onboarding";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react";


export default function Onboarding() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof onboardingForm>>({
        resolver: zodResolver(onboardingForm),
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof onboardingForm>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    // TODO: CONTINUE WORKING ON THIS SHIT.
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" required={true} {...field} />
                            </FormControl>
                            <FormDescription>
                                First and Last Name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" type="date" required={true} {...field} />
                            </FormControl>
                            <FormDescription>
                                Date of Birth.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}