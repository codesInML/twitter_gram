"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandlerMiddleware = (err, req, res, next) => {
    // log.error(err)
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, please try again later"
    };
    if (err.name == "ZodError") {
        customError.message = Object.values(err.issues).map((item) => item.message).join(", ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name == "SequelizeUniqueConstraintError") {
        customError.message = Object.values(err.errors).map((item) => item.message).join(", ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name == "SequelizeValidationError") {
        customError.message = Object.values(err.errors).map((item) => item.message).join(", ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    logger_1.default.error(`error: ${customError.message}`);
    return res.status(customError.statusCode).json({ status: "failed", err: customError.message });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
