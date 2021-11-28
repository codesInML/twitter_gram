import express, { Router } from 'express'
import { likeToggleHandler } from '../controller/like.controller'

const router: Router = express.Router()

router.route('/:postId?/:commentId?').get(likeToggleHandler)

export default router