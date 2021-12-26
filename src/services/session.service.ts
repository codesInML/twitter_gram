import { get } from "lodash";
import * as SessionDAL from "../DAL/session.dal";
import * as UserDAL from "../DAL/user.dal";
import { SessionOutput } from "../models/session";
import { signJWT, verifyJWT } from "../utils/jwt-utils";

export async function createSession(
  userId: string,
  userAgent: string
): Promise<SessionOutput> {
  return await SessionDAL.create(userId, userAgent);
}

export async function findSessions({
  userId,
  valid,
}: {
  userId: string;
  valid: boolean;
}) {
  return await SessionDAL.findAll(userId, valid);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionDAL.findOne(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await UserDAL.findOne(session.userId);

  if (!user) return false;

  // create an access token
  const accessToken = signJWT(
    { ...user, session: session.userId },
    { expiresIn: process.env.ACCESS_TOKEN_TTL as string }
  ); // 5 minutes

  return accessToken;
}

export const updateSessions = async ({
  userId,
  valid,
}: {
  userId: string;
  valid: boolean;
}) => {
  return await SessionDAL.update(userId, valid);
};
