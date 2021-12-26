"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.BadRequestError = exports.NotFoundError = exports.CustomError = void 0;
const customError_1 = __importDefault(require("./customError"));
exports.CustomError = customError_1.default;
const notFound_1 = __importDefault(require("./notFound"));
exports.NotFoundError = notFound_1.default;
const badRequest_1 = __importDefault(require("./badRequest"));
exports.BadRequestError = badRequest_1.default;
const forbidden_1 = __importDefault(require("./forbidden"));
exports.ForbiddenError = forbidden_1.default;
