import {number, object, string} from 'zod'

export const createReplySchema = object({
    body: object({
        text: string({
            required_error: "No reply was given"
        }),
        postId: number({
            required_error: "No comment id given"
        })
    })
})
