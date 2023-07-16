"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const addBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required',
        }),
        publishYear: zod_1.z.string({
            required_error: 'Publish Year is required',
        }),
        reviews: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.BookValidation = {
    addBookZodSchema,
};
