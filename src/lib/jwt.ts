import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "pm_commercial_secure_jwt_token_secret_key_2025_edge";

const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export const ADMIN_COOKIE_NAME = "admin_token";

export interface AdminJwtPayload {
  id: string;
  email: string;
  name?: string;
  role: string;
  [key: string]: any;
}

/**
 * Sign an Edge-compatible JWT using jose
 */
export async function signAdminToken(
  payload: AdminJwtPayload,
  expiresIn = "8h"
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedSecret);
}

/**
 * Verify an Edge-compatible JWT using jose
 */
export async function verifyAdminToken(
  token: string
): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret, {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminJwtPayload;
  } catch {
    return null;
  }
}
