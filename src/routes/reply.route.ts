import express, { Router } from 'express'
import { createReplyHandler } from '../controller/reply.controller'
import validate from '../middleware/validate-resource'
import { createReplySchema } from '../schema/reply.schema'

const router: Router = express.Router()

router.route("/")
    .post(validate(createReplySchema), createReplyHandler)

router.route("/:replyId")
    .patch()
    .delete()

export default router