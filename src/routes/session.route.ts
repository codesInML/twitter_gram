import express, {Router} from 'express'
import { createSessionHandler, getUserSessionHandler } from '../controller/session.controller'
import requireUser from '../middleware/require-user'

const router: Router = express.Router()

router.post('/', createSessionHandler)
router.use(requireUser)
router.get('/', getUserSessionHandler)

export default router