"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        throw new errors_1.ForbiddenError("Unauthorized");
    }
    res.locals.user = user.dataValues;
    return next();
};
exports.default = requireUser;
