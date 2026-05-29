import { createHash, createHmac, randomUUID } from "crypto";

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const COOKIE_NAME = "fernotech_admin";
const COOKIE_MAX_AGE = 8 * 60 * 60; // 8 hours

if (!ADMIN_SECRET || !ADMIN_PASSWORD_HASH) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "ADMIN_SECRET and ADMIN_PASSWORD_HASH should be defined in your environment for admin authentication."
    );
  }
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password, "utf8").digest("hex");
}

export function isValidAdminCredentials(username: string, password: string) {
  if (!ADMIN_PASSWORD_HASH) return false;
  return (
    username === ADMIN_USERNAME &&
    hashPassword(password) === ADMIN_PASSWORD_HASH
  );
}

export interface AdminTokenPayload {
  username: string;
  exp: number;
  nonce: string;
}

function signPayload(payload: string) {
  if (!ADMIN_SECRET) throw new Error("ADMIN_SECRET is not defined");
  return createHmac("sha256", ADMIN_SECRET).update(payload).digest("base64url");
}

export function createAdminToken() {
  const payload: AdminTokenPayload = {
    username: ADMIN_USERNAME,
    exp: Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE,
    nonce: randomUUID(),
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encoded);
  return `${encoded}.${signature}`;
}

export function verifyAdminToken(token?: string) {
  if (!token || !ADMIN_SECRET) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  const expected = signPayload(encoded);
  if (!cryptoTimingSafeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminTokenPayload;

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function cryptoTimingSafeEqual(a: string, b: string) {
  try {
    const aBuf = Buffer.from(a, "utf8");
    const bBuf = Buffer.from(b, "utf8");
    if (aBuf.length !== bBuf.length) return false;
    return createHmac("sha256", ADMIN_SECRET!).update(aBuf).digest().equals(
      createHmac("sha256", ADMIN_SECRET!).update(bBuf).digest()
    );
  } catch {
    return false;
  }
}

const isProduction = process.env.NODE_ENV === "production";

export function createAdminCookieHeader(token: string) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}; ${
    isProduction ? "Secure;" : ""
  }`;
}

export function clearAdminCookieHeader() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${
    isProduction ? "Secure;" : ""
  }`;
}
