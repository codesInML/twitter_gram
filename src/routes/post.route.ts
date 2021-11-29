import express, {Router} from 'express'
import { createPostHandler, deleteUserPostHandler, getAllPostHandler, getAllUserPostHandler, getPostHandler, updateUserPostHandler } from '../controller/post.controller'

const router: Router = express.Router()

router.route("/")
    .post(createPostHandler)
    .get(getAllPostHandler)

router.route("/user")
    .get(getAllUserPostHandler)

router.route("/:postId")
    .patch(updateUserPostHandler)
    .get(getPostHandler)
    .delete(deleteUserPostHandler)

export default router