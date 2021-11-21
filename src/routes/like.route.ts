import express, { Router } from 'express'
import { likeHandler, unlikeHandler } from '../controller/like.controller'

const router: Router = express.Router()

router.route('/true/:postId?/:commentId?').get(likeHandler)
router.route('/false/:postId?/:commentId?').get(unlikeHandler)

export default router