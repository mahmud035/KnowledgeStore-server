import express from 'express';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);

router.get('/', BookController.getAllBooks);

router.post(
  '/add-book',
  validateRequest(BookValidation.addBookZodSchema),
  auth(),
  BookController.addBook
);

router.patch('/:id', auth(), BookController.updateBook);

router.delete('/:id', auth(), BookController.deleteBook);

export const BookRoutes = router;
