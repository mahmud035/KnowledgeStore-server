import express from 'express';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);

router.get('/', BookController.getAllBooks);

router.post(
  '/add-book',
  validateRequest(BookValidation.addBookZodSchema),
  BookController.addBook
);

export const BookRoutes = router;
