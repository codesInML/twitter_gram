import express, {Router} from 'express'
import { createPostHandler } from '../controller/post.controller'
import validate from '../middleware/validate-resource'
import { createSessionSchema } from '../schema/session.schema'

const router: Router = express.Router()

router.route("/").post(validate(createSessionSchema), createPostHandler)

export default router