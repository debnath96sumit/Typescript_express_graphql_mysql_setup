import { z } from 'zod';
export const RegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email('Valid email is required'),
    password: z.string().min(6)
});
export const LoginSchema = z.object({
    email: z.string().email('Valid email is required'),
    password: z.string().min(6)
});
  