import { Book } from './book.model';

const getAllBooks = async () => {
  const result = await Book.find();

  return result;
};

export const BookService = {
  getAllBooks,
};
