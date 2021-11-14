import express, {Router} from 'express'
import { createPostHandler } from '../controller/post.controller'

const router: Router = express.Router()

router.route("/").post(createPostHandler)

export default router