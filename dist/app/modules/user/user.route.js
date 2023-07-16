"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/wishlist/add', (0, auth_1.default)(), user_controller_1.UserController.addToWishlist);
router.post('/reading-list/add', (0, auth_1.default)(), user_controller_1.UserController.addToReadingList);
router.post('/reading-list/finish', (0, auth_1.default)(), user_controller_1.UserController.markAsFinished);
router.get('/reading-list', (0, auth_1.default)(), user_controller_1.UserController.getReadingList);
router.get('/finish-list', (0, auth_1.default)(), user_controller_1.UserController.getFinishedList);
router.get('/wishlist', (0, auth_1.default)(), user_controller_1.UserController.getWishlist);
exports.UserRoutes = router;
