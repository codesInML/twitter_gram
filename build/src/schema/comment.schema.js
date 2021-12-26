"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        text: (0, zod_1.string)({
            required_error: "No comment was given"
        }),
        postId: (0, zod_1.number)({
            required_error: "No post id given"
        })
    })
});
