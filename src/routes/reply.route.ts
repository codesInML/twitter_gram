import express, { Router } from "express";
import { addReplyHandler } from "../controller/reply.controller";

const router: Router = express.Router();

router.route("/").post(addReplyHandler);

// since the replies are also comment, we can update and delete them using the comment update and delete routes

export default router;
