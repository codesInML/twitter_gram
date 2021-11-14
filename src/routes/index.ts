import express, {Router} from 'express'
import userRoute from './user.route'
import sessionRoute from './session.route'
import postRoute from './post.route'
import followRoute from './follow.route'
import requireUser from '../middleware/require-user'

const router: Router = express.Router()

router.use("/users", userRoute)
router.use("/sessions", sessionRoute)
router.use(requireUser)
router.use("/posts", postRoute)
router.use("/follow", followRoute)

export default router