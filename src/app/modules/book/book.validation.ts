import { z } from 'zod';

const addBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publishYear: z.string({
      required_error: 'Publish Year is required',
    }),
    reviews: z.array(z.string()).optional(),
  }),
});

export const BookValidation = {
  addBookZodSchema,
};
