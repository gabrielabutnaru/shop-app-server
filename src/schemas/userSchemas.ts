import { z } from 'zod';

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const userRegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
});
