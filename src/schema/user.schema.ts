import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "First name is required"
        }),
        lastName: string({
            required_error: "Last name is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Please provide a valid email"),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password too short, should be minium of 6 chars"),
    })
})
export type CreateUserInput = TypeOf<typeof createUserSchema>