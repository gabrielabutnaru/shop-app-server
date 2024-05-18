import { z } from 'zod';

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const userRegisterSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(4),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[!@#$%^&* _.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
});
