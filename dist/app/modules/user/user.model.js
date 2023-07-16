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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const util_1 = require("util"); // Add this import (after)
const bcryptHash = (0, util_1.promisify)(bcrypt_1.default.hash); // Promisify the `bcrypt.hash` function (after)
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Set select to false to exclude the field by default
    },
    wishlist: {
        type: [String],
    },
    readingList: {
        type: [String],
    },
    finishedBooks: {
        type: [String],
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password; // Exclude password field from the serialized JSON
        },
        virtuals: true,
    },
});
// Instance Method
UserSchema.methods.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email: email }, {
            _id: 1,
            email: 1,
            password: 1,
        });
    });
};
// Instance Method
UserSchema.methods.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// NOTE: When create an order for a buyer, an error occurred:
// `data and salt arguments required`. To solve that error chatGPT suggest that code.
// Hashing User Password
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // console.log(user);
        // Check if the password is already hashed (bcrypt returns a hash with 60 characters)
        if (user.isModified('password') && user.password.length < 60) {
            try {
                // Use the promisified `bcrypt.hash` function here
                user.password = yield bcryptHash(user.password, Number(config_1.default.bcrypt_salt_rounds));
            }
            catch (error) {
                return next();
            }
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
