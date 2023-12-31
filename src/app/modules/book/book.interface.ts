import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  email: string;
  genre: string;
  publishYear: string;
  reviews?: string[];
};

export type IBookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
};
