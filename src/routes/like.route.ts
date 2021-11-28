import express, { Router } from 'express'
import { likeToggleHandler, unlikeHandler } from '../controller/like.controller'

const router: Router = express.Router()

router.route('/true/:postId?/:commentId?').get(likeToggleHandler)
router.route('/false/:postId?/:commentId?').get(unlikeHandler)

export default router