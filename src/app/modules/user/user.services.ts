/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { Admin } from '../admin/admin.model';
import { IAdmin } from '../admin/admin.interface';

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  //* dynamically handle
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;

      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });

  return result;
};

const userProfileInfo = async (id: string, userRole: string) => {
  let result: IUser | IAdmin | null = null;

  if (userRole === 'admin') {
    result = await Admin.findById(id);
  } else {
    result = await User.findById(id);
  }

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  return result;
};

const updateProfileInfo = async (
  id: string,
  userRole: string,
  payload: Partial<IUser> | Partial<IAdmin>
) => {
  let isExist;

  if (userRole === 'admin') {
    isExist = await Admin.findById(id);
  } else {
    isExist = await User.findById(id);
  }

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> | Partial<IAdmin> = { ...userData };

  //* dynamically handle
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof (Partial<IUser> & Partial<IAdmin>);

      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  let result;

  if (userRole === 'admin') {
    result = await Admin.findOneAndUpdate({ _id: id }, updatedUserData, {
      new: true,
    });
  } else {
    result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
      new: true,
    });
  }

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  userProfileInfo,
  updateProfileInfo,
};
