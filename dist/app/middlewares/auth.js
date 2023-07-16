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
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const auth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('requiredRoles:', requiredRoles);
        //* (i) get authorization token
        const token = req.headers.authorization;
        // console.log('Get Token:', token);
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized.');
        }
        //* (ii) verify token
        let verifiedUser = null;
        verifiedUser = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.access_token_secret);
        console.log(verifiedUser);
        req.user = verifiedUser; // '_id', userEmail', 'userPassword' ache.
        //? role diye guard korar jonno
        // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        // }
        return next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
