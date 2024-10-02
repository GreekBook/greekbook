'use client';

import {createOrgFormSchema} from "@/lib/forms/organizations";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import {Check, ChevronsUpDown, Plus} from "lucide-react";
import React, {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {createOrganization} from "@/lib/actions/organizations";

const universities = [
    // TODO: CHANGE HARDCODED ID, THIS IS SUPER DUPER HACKY BUT DEADLINES MUST BE MET.
    { id: "8680d693-1c56-4053-b2b5-8c2a34c0591f", name: "Virginia Tech" },
    { id: "2", name: "James Madison University" },
    { id: "3", name: "Test College" },
    // ... more universities
];

export default function CreateOrganizationForm() {


    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof createOrgFormSchema>>({
        resolver: zodResolver(createOrgFormSchema),
    });

    const fileRef = form.register("image");

    async function onSubmit(values: z.infer<typeof createOrgFormSchema>) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", values.image[0] as File, values.image[0].name);
        formData.append("universityId", values.universityId);
        const result = await createOrganization(formData);
        if (result.errors) {
            toast.error("Failed to create organization.");
            return;
        }
        toast.success("Organization created successfully.");

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-5 w-5 mr-2"/>
                    New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Organization</DialogTitle>
                    <DialogDescription>
                        Create a new organization
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ruthless Beats" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the name of your organization.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="A underground music club in..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Describe your organization!
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input type="file" placeholder="logo.png" {...fileRef} />
                                        </FormControl>
                                        <FormDescription>
                                            Small logo 500x500px
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="universityId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>University</FormLabel>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        className="w-full justify-between"
                                                    >
                                                        {field.value
                                                            ? universities.find((university) => university.id === field.value)?.name
                                                            : "Select university..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search university..." />
                                                    <CommandEmpty>No university found.</CommandEmpty>
                                                    <CommandGroup>
                                                        <CommandList>
                                                            {universities.map((university) => (
                                                                <CommandItem
                                                                    key={university.id}
                                                                    value={university.name}
                                                                    onSelect={() => {
                                                                        form.setValue("universityId", university.id)
                                                                        setOpen(false)
                                                                    }}
                                                                >
                                                                    {form.getValues().universityId == university.id && <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            university.id === field.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />}
                                                                    {university.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandList>
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Select the university this organization is associated with.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="gap-2.5">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit">Create</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}