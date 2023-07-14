import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const createUser = async (user: IUser): Promise<IUser> => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }

  return createdUser;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  //* (i) Check user exists or not
  // creating instance of User
  const user = new User(); // Instance Method

  // access to our instance methods
  const isUserExist = await user.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //* (ii) Check password match or not
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //* (iii) Generate accessToken and refreshToken using jwtHelper utility function

  const { _id, role, phoneNumber: contactNumber } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { _id, role, contactNumber },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { _id, role, contactNumber },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken: string | JwtPayload;

  //* (i) verify token
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    ) as JwtPayload;

    // console.log(verifiedToken, 'verifiedToken');
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { _id, role, contactNumber } = verifiedToken; // _id, role, contactNumber ache.

  //* (ii) checking deleted user's refreshToken
  const user = new User(); // Instance Method

  // access to our instance methods
  const isUserExist = await user.isUserExist(contactNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //* (iii) generate new accessToken
  const newAccessToken = jwtHelper.createToken(
    { _id, role, contactNumber },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
