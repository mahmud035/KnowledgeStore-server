/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';

export type IUser = {
  _id: ObjectId;
  email: string;
  password: string;
  wishlist?: string[];
};

// Instance Method
export type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
