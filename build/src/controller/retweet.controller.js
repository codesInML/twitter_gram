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
exports.createRetweetHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const retweet_service_1 = require("../services/retweet.service");
const createRetweetHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const { userId } = res.locals.user;
    if (!postId)
        throw new errors_1.BadRequestError("no post id was given");
    const retweet = yield (0, retweet_service_1.createRetweet)(userId, postId, next);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", msg: "retweeted", retweet });
});
exports.createRetweetHandler = createRetweetHandler;
