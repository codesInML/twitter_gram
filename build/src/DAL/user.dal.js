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
exports.findOne = exports.create = void 0;
const models_1 = __importDefault(require("../models"));
const { User } = models_1.default;
const create = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.create(input);
});
exports.create = create;
const findOne = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (input.includes("@")) ? yield User.findOne({ where: { email: input } }) : yield User.findOne({ where: { userId: input } });
});
exports.findOne = findOne;
