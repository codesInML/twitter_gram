import {object, string} from 'zod'

export const followUserSchema = object({
    body: object({
        followedId: string({
            required_error: "No user id given"
        })
    })
})