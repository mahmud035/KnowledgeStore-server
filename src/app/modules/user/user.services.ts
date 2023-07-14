import { IBook } from '../book/book.interface';
import { Book } from '../book/book.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const addToWishlist = async (userId: string, bookId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { wishlist: bookId },
    },
    { new: true }
  );

  return result;
};

const getWishlist = async (userId: string) => {
  const user: IUser | null = await User.findById(userId)
    .select('wishlist')
    .lean();

  const wishlist = user?.wishlist;

  const books: IBook[] = await Book.find({
    _id: { $in: wishlist },
  });

  return books;
};

const addToReadingList = async (userId: string, bookId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        readingList: bookId,
      },
      $pull: {
        finishedBooks: bookId, // remove BookId from finishList
      },
    },
    { new: true }
  );

  return result;
};

const markAsFinished = async (userId: string, bookId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        finishedBooks: bookId,
      },
      $pull: {
        readingList: bookId, // remove BookId from readingList
      },
    },
    {
      new: true,
    }
  );

  return result;
};

const getReadingList = async (userId: string) => {
  const user: IUser | null = await User.findById(userId)
    .select('readingList')
    .lean();

  const readingList = user?.readingList;

  const books: IBook[] = await Book.find({
    _id: { $in: readingList },
  });

  return books;
};

export const UserService = {
  addToWishlist,
  getWishlist,
  addToReadingList,
  markAsFinished,
  getReadingList,
};
