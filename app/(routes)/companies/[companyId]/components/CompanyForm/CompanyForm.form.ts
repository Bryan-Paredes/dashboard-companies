import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    country: z.string().min(2),
    website: z.string().min(2),
    phone: z.string().min(6).max(8),
    cif: z.string().min(6),
    profileImage: z.string(),
    description: z.string().nullable(),
});