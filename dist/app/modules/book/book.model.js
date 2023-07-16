"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publishYear: {
        type: String,
        required: true,
    },
    reviews: {
        type: [String],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Book = (0, mongoose_1.model)('Book', BookSchema);
