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
exports.addReplyHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const reply_service_1 = require("../services/reply.service");
const image_upload_utils_1 = require("../utils/image-upload-utils");
const addReplyHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield (0, image_upload_utils_1.postUpload)(req, res, next);
    const { userId } = res.locals.user;
    const reply = yield (0, reply_service_1.createReply)(Object.assign({ userId }, payload));
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", msg: "reply added", reply });
});
exports.addReplyHandler = addReplyHandler;
