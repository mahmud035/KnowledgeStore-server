import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/wishlist/add', auth(), UserController.addToWishlist);

export const UserRoutes = router;
