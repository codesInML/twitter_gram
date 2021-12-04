import express, { Router } from 'express'
import { createRetweetHandler } from '../controller/retweet.controller'

const router: Router = express.Router()

router.route('/:postId?').post(createRetweetHandler)
// since retweeting is also a post, you can delete it with the delepe post endpoint


export default router