/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

// IMPORTANT: Extends Express Request object with 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | null;
    }
  }
}

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('requiredRoles:', requiredRoles);

    //* (i) get authorization token
    const token = req.headers.authorization;
    // console.log('Get Token:', token);

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
    }

    //* (ii) verify token
    let verifiedUser = null;

    verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.access_token_secret as Secret
    ) as JwtPayload;

    console.log(verifiedUser);
    req.user = verifiedUser; // '_id', userEmail', 'userPassword' ache.

    //? role diye guard korar jonno
    // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
    //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    // }

    return next();
  } catch (error) {
    next(error);
  }
};

export default auth;
