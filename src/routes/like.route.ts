import express, { Router } from 'express'
import { likeHandler, unlikeHandler } from '../controller/like.controller'

const router: Router = express.Router()

router.route('/true/:postId').get(likeHandler)
router.route('/false/:postId').get(unlikeHandler)

export default router