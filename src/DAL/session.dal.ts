import { SessionOutput } from "../models/session";
import db from '../models'

const {Session} = db

export const create = async (userId: string, userAgent: string): Promise<SessionOutput> => {
    return await Session.create({userId, userAgent})
}

export const findOne = async (userId: string): Promise<SessionOutput> => {
    return await Session.findOne({ where: { userId } })
}

export const findAll = async (userId: string, valid: boolean): Promise<SessionOutput> => {
    return await Session.findAll({ where: { userId, valid } })
}