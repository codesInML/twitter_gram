import { SessionOutput } from "../models/session";
import models from "../models";

const { Session } = models;

export const create = async (
  userId: string,
  userAgent: string
): Promise<SessionOutput> => {
  return await Session.create({ userId, userAgent });
};

export const findOne = async (id: string): Promise<SessionOutput> => {
  return await Session.findOne({ where: { id } });
};

export const findAll = async (
  userId: string,
  valid: boolean
): Promise<SessionOutput> => {
  return await Session.findAll({ where: { userId, valid } });
};

export const update = async (
  userId: string,
  valid: boolean
): Promise<SessionOutput> => {
  return await Session.update({ valid }, { where: { userId } });
};
