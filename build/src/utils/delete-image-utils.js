"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = void 0;
const fs_1 = require("fs");
const deleteImage = (img_url, next) => {
    (0, fs_1.unlink)(img_url, (err) => {
        if (err)
            next(err);
    });
};
exports.deleteImage = deleteImage;
