import express, {Router} from 'express'
import { followHandler } from '../controller/follow.controller'

const router: Router = express.Router()

router.route("/").post(followHandler)

export default router