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
exports.findAllFollowing = exports.findAllFollowers = exports.remove = exports.create = void 0;
const errors_1 = require("../errors");
const user_dal_1 = require("./user.dal");
const models_1 = __importDefault(require("../models"));
const { Follow } = models_1.default;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const followed = yield (0, user_dal_1.findOne)(payload.followedId);
    if (!followed)
        throw new errors_1.BadRequestError(`no user with the id ${payload.followedId}`);
    const user = yield (0, user_dal_1.findOne)(payload.userId);
    if (yield followed.hasFollowed(user))
        throw new errors_1.BadRequestError("you have already followed user");
    yield followed.addFollowed(user);
});
exports.create = create;
const remove = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const followed = yield (0, user_dal_1.findOne)(payload.followedId);
    if (!followed)
        throw new errors_1.BadRequestError(`no user with the id ${payload.followedId}`);
    const user = yield (0, user_dal_1.findOne)(payload.userId);
    if (!(yield followed.hasFollowed(user)))
        throw new errors_1.BadRequestError("you do not follow user");
    yield followed.removeFollowed(user);
});
exports.remove = remove;
const findAllFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_dal_1.findOne)(userId);
    return yield user.getFollowed({
        attributes: ["userId", "firstName", "lastName"],
        joinTableAttributes: []
    });
});
exports.findAllFollowers = findAllFollowers;
const findAllFollowing = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_dal_1.findOne)(userId);
    return yield user.getUser({
        attributes: ["userId", "firstName", "lastName"],
        joinTableAttributes: []
    });
});
exports.findAllFollowing = findAllFollowing;
