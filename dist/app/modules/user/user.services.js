"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const book_model_1 = require("../book/book.model");
const user_model_1 = require("./user.model");
const addToWishlist = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        $addToSet: { wishlist: bookId },
    }, { new: true });
    return result;
});
const getWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId)
        .select('wishlist')
        .lean();
    const wishlist = user === null || user === void 0 ? void 0 : user.wishlist;
    const books = yield book_model_1.Book.find({
        _id: { $in: wishlist },
    });
    return books;
});
const addToReadingList = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        $addToSet: {
            readingList: bookId,
        },
        $pull: {
            finishedBooks: bookId, // remove BookId from finishList
        },
    }, { new: true });
    return result;
});
const markAsFinished = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        $addToSet: {
            finishedBooks: bookId,
        },
        $pull: {
            readingList: bookId, // remove BookId from readingList
        },
    }, {
        new: true,
    });
    return result;
});
const getReadingList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId)
        .select('readingList')
        .lean();
    const readingList = user === null || user === void 0 ? void 0 : user.readingList;
    const books = yield book_model_1.Book.find({
        _id: { $in: readingList },
    });
    return books;
});
const getFinishedList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId)
        .select('finishedBooks')
        .lean();
    const finishedList = user === null || user === void 0 ? void 0 : user.finishedBooks;
    const books = yield book_model_1.Book.find({
        _id: { $in: finishedList },
    });
    return books;
});
exports.UserService = {
    addToWishlist,
    getWishlist,
    addToReadingList,
    markAsFinished,
    getReadingList,
    getFinishedList,
};
