import {number, object, string} from 'zod'

export const commentSchema = object({
    body: object({
        text: string({
            required_error: "No comment was given"
        }),
        postId: number({
            required_error: "No post id given"
        })
    })
})