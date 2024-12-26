import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string({required_error:'Password id required'}).min(2, "Password is required"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;