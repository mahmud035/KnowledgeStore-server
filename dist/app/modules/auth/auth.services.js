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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const user_model_1 = require("../user/user.model");
const createUser = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield user_model_1.User.findOne({ email: user.email }, { email: 1, _id: 0 });
    // console.log(emailExist, 'auth.services.ts');
    // FIXME: Error isn't send to the client! Server crashed
    if (emailExist === null || emailExist === void 0 ? void 0 : emailExist.email) {
        // TEMPORARY SOLUTION
        res.json({
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: 'Email already exists. Use new email address.',
        });
        throw new Error('Email already in use.');
    }
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(400, 'Failed to create user');
    }
    return createdUser;
});
const loginUser = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //* (i) Check user exists or not
    // creating instance of User
    const user = new user_model_1.User(); // Instance Method
    // access to our instance methods
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        // TEMPORARY SOLUTION
        res.json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'User does not exist. Provide a valid email address.',
        });
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //* (ii) Check password match or not
    if (isUserExist.password &&
        !(yield user.isPasswordMatched(password, isUserExist.password))) {
        // TEMPORARY SOLUTION
        res.json({
            success: false,
            statusCode: http_status_1.default.UNAUTHORIZED,
            message: 'Password is incorrect',
        });
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //* (iii) Generate accessToken and refreshToken using jwtHelper utility function
    const { _id, email: userEmail, password: userPassword } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelper.createToken({ _id, userEmail, userPassword }, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expires_in);
    const refreshToken = jwtHelper_1.jwtHelper.createToken({ _id, userEmail, userPassword }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken;
    //* (i) verify token
    try {
        verifiedToken = jwtHelper_1.jwtHelper.verifyToken(token, config_1.default.jwt.refresh_token_secret);
        // console.log(verifiedToken, 'verifiedToken');
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { _id, userEmail, userPassword } = verifiedToken; // _id, userEmail, userPassword ache.
    //* (ii) checking deleted user's refreshToken
    const user = new user_model_1.User(); // Instance Method
    // access to our instance methods
    const isUserExist = yield user.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //* (iii) generate new accessToken
    const newAccessToken = jwtHelper_1.jwtHelper.createToken({ _id, userEmail, userPassword }, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    createUser,
    loginUser,
    refreshToken,
};
