import express, {Router} from 'express'
import { followUserHandler } from '../controller/follow.controller'
import validate from '../middleware/validate-resource'
import { followUserSchema } from '../schema/follow.schema'

const router: Router = express.Router()

router.route("/").post(validate(followUserSchema), followUserHandler)

export default router