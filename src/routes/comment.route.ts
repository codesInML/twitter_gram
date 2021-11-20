import express, {Router} from 'express'
import { addCommentHandler, deleteCommentHandler, editCommentHandler } from '../controller/comment.ccontroller'
import validate from '../middleware/validate-resource'
import { createCommentSchema } from '../schema/comment.schema'

const router: Router = express.Router()

router.route("/")
    .post(validate(createCommentSchema), addCommentHandler)

router.route("/:commentId")
    .patch(editCommentHandler)
    .delete(deleteCommentHandler)

export default router