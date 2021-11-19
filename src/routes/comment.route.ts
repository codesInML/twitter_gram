import express, {Router} from 'express'
import { addCommentHandler, deleteCommentHandler, editCommentHandler } from '../controller/comment.ccontroller'
import validate from '../middleware/validate-resource'
import { commentSchema } from '../schema/comment.schema'

const router: Router = express.Router()

router.route("/")
    .post(validate(commentSchema), addCommentHandler)

router.route("/:commentId")
    .patch(validate(commentSchema), editCommentHandler)
    .delete(deleteCommentHandler)

export default router