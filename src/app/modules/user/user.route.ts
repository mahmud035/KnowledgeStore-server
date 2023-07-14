import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/wishlist/add', auth(), UserController.addToWishlist);

router.get('/wishlist', auth(), UserController.getWishlist);

export const UserRoutes = router;
