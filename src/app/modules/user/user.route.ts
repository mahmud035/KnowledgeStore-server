import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/wishlist/add', auth(), UserController.addToWishlist);

router.post('/reading-list/add', auth(), UserController.addToReadingList);

router.post('/reading-list/finish', auth(), UserController.markAsFinished);

router.get('/reading-list', auth(), UserController.getReadingList);

router.get('/finish-list', auth(), UserController.getFinishedList);

router.get('/wishlist', auth(), UserController.getWishlist);

export const UserRoutes = router;
