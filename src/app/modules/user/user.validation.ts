import { z } from 'zod';
import { UserRole } from './user.interface';

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([UserRole.Seller, UserRole.Buyer]).optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const updateProfileZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
  updateProfileZodSchema,
};
