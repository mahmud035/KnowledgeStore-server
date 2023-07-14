import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Document } from 'mongoose';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { UserService } from './user.services';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

const userProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const userRole = req?.user?.role;
  const result = await UserService.userProfileInfo(userId, userRole);

  // IMPORTANT: Check if the result is an instance of Document, and use toJSON() method to convert it to a plain JavaScript object
  const userData: IUser | IAdmin | null =
    result instanceof Document ? result.toJSON() : null;

  sendResponse<IUser | IAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User's information retrieved successfully`,
    data: userData,
  });
});

const updateProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const userRole = req?.user?.role;
  const updatedData = req.body;

  // Hash the password if it is provided in the updatedData payload
  if (updatedData.password) {
    const hashedPassword = await bcrypt.hash(
      updatedData.password,
      Number(config.bcrypt_salt_rounds)
    );
    updatedData.password = hashedPassword;
  }

  const result = await UserService.updateProfileInfo(
    userId,
    userRole,
    updatedData
  );

  let userData: IUser | IAdmin | null = null;

  if (result instanceof User || result instanceof Admin) {
    userData = result?.toObject();
  }

  sendResponse<IUser | IAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User's information updated successfully`,
    data: userData,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  userProfileInfo,
  updateProfileInfo,
};
