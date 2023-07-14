/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, IUserMethods, UserModel } from './user.interface';
import { promisify } from 'util'; // Add this import (after)

const bcryptHash = promisify(bcrypt.hash); // Promisify the `bcrypt.hash` function (after)

const UserSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Set select to false to exclude the field by default
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password; // Exclude password field from the serialized JSON
      },
      virtuals: true,
    },
  }
);

// Instance Method
UserSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { phoneNumber: phoneNumber },
    {
      _id: 1,
      role: 1,
      password: 1,
      phoneNumber: 1,
    }
  );
};
// Instance Method
UserSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// NOTE: When create an order for a buyer, an error occurred:
// `data and salt arguments required`. To solve that error chatGPT suggest that code.

// Hashing User Password
UserSchema.pre('save', async function (next) {
  const user = this;
  // console.log(user);

  // Before:
  // user.password = await bcrypt.hash(
  //   user.password,
  //   Number(config.bcrypt_salt_rounds)
  // );
  // next();

  // After:
  // Check if the password is already hashed (bcrypt returns a hash with 60 characters)
  if (user.isModified('password') && user.password.length < 60) {
    try {
      // Use the promisified `bcrypt.hash` function here
      user.password = await bcryptHash(
        user.password,
        Number(config.bcrypt_salt_rounds)
      );
    } catch (error) {
      return next();
    }
  }

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
