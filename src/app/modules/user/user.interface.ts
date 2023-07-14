/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';

export enum UserRole {
  Seller = 'seller',
  Buyer = 'buyer',
}

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id: ObjectId;
  password: string;
  role: UserRole.Seller | UserRole.Buyer;
  name: UserName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
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
