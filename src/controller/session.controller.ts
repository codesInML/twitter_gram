import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UnauthenticatedError from "../errors/unauthenticated";
import {
  createSession,
  findSessions,
  updateSessions,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWT } from "../utils/jwt-utils";

export const createSessionHandler = async (req: Request, res: Response) => {
  // validate user password
  const user = await validatePassword(req.body);

  // check if user was returned
  if (!user) throw new UnauthenticatedError("Invalid email or password");

  // create the session
  const session = await createSession(user.userId, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJWT(
    { ...user, session: session.id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL as string }
  ); // 5 minutes

  // create an access token
  const refreshToken = signJWT(
    { ...user, session: session.id },
    { expiresIn: process.env.REFRESH_TOKEN_TTL as string }
  ); // 1 year

  return res
    .status(StatusCodes.CREATED)
    .json({ status: "success", accessToken, refreshToken });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const { userId } = res.locals.user;

  const sessions = await findSessions({ userId, valid: true });

  return res.status(StatusCodes.OK).json({ status: "success", sessions });
};

export const deleteUserSessionHandler = async (req: Request, res: Response) => {
  const { userId } = res.locals.user;

  await updateSessions({ userId, valid: false });

  return res
    .status(StatusCodes.OK)
    .json({ status: "success", accessToken: null, refreshToken: null });
};
