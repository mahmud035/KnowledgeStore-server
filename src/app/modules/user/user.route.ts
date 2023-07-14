import express from 'express';
import { ENUM_USER_ROLL } from '../../../enum/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.patch(
  '/my-profile',
  validateRequest(UserValidation.updateProfileZodSchema),
  auth(ENUM_USER_ROLL.BUYER, ENUM_USER_ROLL.SELLER),
  UserController.updateProfileInfo
);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLL.ADMIN),
  UserController.updateUser
);

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLL.BUYER, ENUM_USER_ROLL.SELLER),
  UserController.userProfileInfo
);

router.get('/:id', auth(ENUM_USER_ROLL.ADMIN), UserController.getSingleUser);

router.get('/', auth(ENUM_USER_ROLL.ADMIN), UserController.getAllUsers);

router.delete('/:id', auth(ENUM_USER_ROLL.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
