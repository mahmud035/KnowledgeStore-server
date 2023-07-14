import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const bookId = req.body.bookId;

  const result = await UserService.addToWishlist(userId, bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to wishlist successfully',
    data: result,
  });
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  const result = await UserService.getWishlist(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrieved successfully',
    data: result,
  });
});

const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const bookId = req.body.bookId;

  const result = await UserService.addToReadingList(userId, bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to reading list successfully',
    data: result,
  });
});

export const UserController = {
  addToWishlist,
  getWishlist,
  addToReadingList,
};
