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

const markAsFinished = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const bookId = req.body.bookId;

  const result = await UserService.markAsFinished(userId, bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book marked as finished successfully',
    data: result,
  });
});

const getReadingList = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  const result = await UserService.getReadingList(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reading list retrieved successfully',
    data: result,
  });
});

const getFinishedList = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  const result = await UserService.getFinishedList(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Finished books list retrieved successfully',
    data: result,
  });
});

export const UserController = {
  addToWishlist,
  getWishlist,
  addToReadingList,
  markAsFinished,
  getReadingList,
  getFinishedList,
};
