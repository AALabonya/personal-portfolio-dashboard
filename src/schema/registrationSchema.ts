import { z } from "zod";

export const registrationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(2, "Password should be at least 6 characters long"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    role: z.string(),
    // role: z.enum(["customer", "vendor"],
});