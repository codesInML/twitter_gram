import express, { Router } from "express";
import {
  addCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
} from "../controller/comment.controller";

const router: Router = express.Router();

router.route("/").post(addCommentHandler);

router
  .route("/:commentId")
  .patch(editCommentHandler)
  .delete(deleteCommentHandler);

export default router;
