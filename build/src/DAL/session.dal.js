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
exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const models_1 = __importDefault(require("../models"));
const { Session } = models_1.default;
const create = (userId, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Session.create({ userId, userAgent });
});
exports.create = create;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Session.findOne({ where: { id } });
});
exports.findOne = findOne;
const findAll = (userId, valid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Session.findAll({ where: { userId, valid } });
});
exports.findAll = findAll;
const update = (userId, valid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Session.update({ valid }, { where: { userId } });
});
exports.update = update;
