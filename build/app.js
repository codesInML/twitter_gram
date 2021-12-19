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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// configure the environment variables
require('dotenv').config();
global.__basedir = __dirname;
// set the port
const PORT = process.env.PORT;
// for async errors
require("express-async-errors");
// bring in the database connection
const models_1 = __importDefault(require("./src/models"));
// initialize the express app
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// logger
const logger_1 = __importDefault(require("./src/utils/logger"));
// security packages
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const xss = require('xss-clean');
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// import middlewares
const routes_1 = __importDefault(require("./src/routes"));
const error_handler_1 = require("./src/middleware/error-handler");
const not_found_1 = require("./src/middleware/not-found");
const deserialize_user_1 = __importDefault(require("./src/middleware/deserialize-user"));
// security middlewares
app.set("trust proxy", 1);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(xss());
app.use((0, express_rate_limit_1.default)({ windowMs: 60 * 1000, max: 60 }));
// deserialize user
app.use(deserialize_user_1.default);
// documentation route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the twitter gram documentation</h1>");
});
// app routes
app.use('/api/v1', routes_1.default);
// not found middleware
app.use(not_found_1.notFound);
// error handler middleware
app.use(error_handler_1.errorHandlerMiddleware);
// start the express app
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.sequelize.authenticate();
        logger_1.default.info("connected to the database");
        app.listen(PORT, () => logger_1.default.info(`Server started on port ${process.env.PORT}`));
    }
    catch (err) {
        logger_1.default.error("could not connect to the database", err);
        process.exit(1);
    }
});
start();
