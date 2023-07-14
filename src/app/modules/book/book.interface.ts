import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publishYear: string;
  reviews?: string[];
};

export type IBookModel = Model<IBook, Record<string, unknown>>;
