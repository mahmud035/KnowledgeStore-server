"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.get('/', book_controller_1.BookController.getAllBooks);
router.patch('/:id', (0, auth_1.default)(), book_controller_1.BookController.updateBook);
router.patch('/add-review/:id', (0, auth_1.default)(), book_controller_1.BookController.addReview);
router.post('/add-book', (0, validateRequest_1.default)(book_validation_1.BookValidation.addBookZodSchema), (0, auth_1.default)(), book_controller_1.BookController.addBook);
router.delete('/:id', (0, auth_1.default)(), book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
