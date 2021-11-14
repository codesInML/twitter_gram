import {Request, Response} from 'express'

export const followHandler = async (req: Request, res: Response) => {
    res.send("Following...")
}