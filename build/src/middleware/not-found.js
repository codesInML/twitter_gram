"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFound = (req, res) => res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send('Route does not exist');
exports.notFound = notFound;
