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
    },
    { new: true }
  );

  return result;
};

export const UserService = {
  addToWishlist,
  getWishlist,
  addToReadingList,
};
