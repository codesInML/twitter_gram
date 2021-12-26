"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First name is required"
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required"
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required"
        }).email("Please provide a valid email"),
        password: (0, zod_1.string)({
            required_error: "Password is required"
        }).min(6, "Password too short, should be minium of 6 chars"),
    })
});
