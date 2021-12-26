"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUserSchema = void 0;
const zod_1 = require("zod");
exports.followUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        followedId: (0, zod_1.string)({
            required_error: "No user id given"
        })
    })
});
