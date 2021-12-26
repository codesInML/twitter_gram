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
exports.getAllFollowingHandler = exports.getAllFollowersHandler = exports.unFollowUserHandler = exports.followUserHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const follow_service_1 = require("../services/follow.service");
// follow someone
const followUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followedId } = req.body;
    const { userId } = res.locals.user;
    yield (0, follow_service_1.followUser)({ userId, followedId });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", msg: "followed user" });
});
exports.followUserHandler = followUserHandler;
// unfollow someone
const unFollowUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followedId } = req.body;
    const { userId } = res.locals.user;
    yield (0, follow_service_1.unfollowUser)({ userId, followedId });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", msg: "unfollowed user" });
});
exports.unFollowUserHandler = unFollowUserHandler;
// get all user's followers
const getAllFollowersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const followers = yield (0, follow_service_1.getAllFollowers)(userId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", followers });
});
exports.getAllFollowersHandler = getAllFollowersHandler;
// get all the people the user is following
const getAllFollowingHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const following = yield (0, follow_service_1.getAllFollowing)(userId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", following });
});
exports.getAllFollowingHandler = getAllFollowingHandler;
