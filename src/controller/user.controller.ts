import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CreateUserInput } from "../schema/user.schema"
import { createUser } from "../services/user.service"

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput["body" ]>, res: Response) => {
    const user = await createUser({...req.body, isActive: true})
    return res.status(StatusCodes.CREATED).json({status: "success", user}) 
}