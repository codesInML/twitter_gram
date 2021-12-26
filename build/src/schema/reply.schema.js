"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReplySchema = void 0;
const zod_1 = require("zod");
exports.createReplySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        text: (0, zod_1.string)({
            required_error: "No reply was given"
        }),
        postId: (0, zod_1.number)({
            required_error: "No comment id given"
        })
    })
});
