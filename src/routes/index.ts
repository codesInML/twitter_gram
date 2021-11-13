import express, {Router} from 'express'
import userRoute from './user.route'
import sessionRoute from './session.route'

const router: Router = express.Router()

router.use("/users", userRoute)
router.use("/sessions", sessionRoute)

export default router