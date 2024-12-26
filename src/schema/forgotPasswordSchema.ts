import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    // password: z.string({required_error:'Password id required'}).min(2, "Password is required"),
});

export type forgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;