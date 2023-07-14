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

export const UserService = { addToWishlist };
