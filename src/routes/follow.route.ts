import express, {Router} from 'express'
import { followUserHandler, unFollowUserHandler } from '../controller/follow.controller'
import validate from '../middleware/validate-resource'
import { followUserSchema } from '../schema/follow.schema'

const router: Router = express.Router()

router.route("/")
    .post(validate(followUserSchema), followUserHandler)
    .delete(validate(followUserSchema), unFollowUserHandler)

export default router