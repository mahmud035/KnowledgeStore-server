import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { SortOrder } from 'mongoose';

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  console.log(filters);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const result = await Book.findById({ _id: id });
  return result;
};

const addBook = async (book: IBook) => {
  const result = await Book.create(book);
  return result;
};

const updateBook = async (id: string, book: Partial<IBook>) => {
  const bookExist = await Book.findById(id);

  if (!bookExist) {
    return null;
  }

  // Merge the existing reviews with the updated data
  const updatedData = {
    ...book,
    reviews: book.reviews,
  };

  const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return updatedBook;
};

const addReview = async (bookId: string, review: string) => {
  console.log(bookId, review);
  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      $push: { reviews: review },
    },
    { new: true }
  );

  return updatedBook;
};

const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete({ _id: id });
  return result;
};

export const BookService = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  addReview,
  deleteBook,
};
