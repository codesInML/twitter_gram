import express, { Router } from 'express'
import { addReplyHandler } from '../controller/reply.controller'
import validate from '../middleware/validate-resource'
import { createReplySchema } from '../schema/reply.schema'

const router: Router = express.Router()

router.route("/")
    .post(validate(createReplySchema), addReplyHandler)

// since the replies are also comment, we can update and delete them using the comment update and delete routes 

export default router