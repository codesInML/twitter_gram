import express, {Router} from 'express'
import userRoute from './user.route'
import sessionRoute from './session.route'
import postRoute from './post.route'
import followRoute from './follow.route'
import commentRoute from './comment.route'
import likeRoute from './like.route'
import requireUser from '../middleware/require-user'

const router: Router = express.Router()

router.use("/users", userRoute)
router.use("/sessions", sessionRoute)
router.use(requireUser)
router.use("/posts", postRoute)
router.use("/comments", commentRoute)
router.use("/follow", followRoute)
router.use("/likes", likeRoute)

export default router