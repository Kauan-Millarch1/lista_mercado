import { cookies, headers } from "next/headers";

export const VISITOR_COOKIE_KEY = "bmad_visitor_id";

export async function getVisitorIdFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(VISITOR_COOKIE_KEY)?.value ?? null;
}

export async function setVisitorIdCookie(visitorId: string) {
  const cookieStore = await cookies();
  cookieStore.set(VISITOR_COOKIE_KEY, visitorId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
}

export async function clearVisitorIdCookie() {
  const cookieStore = await cookies();
  cookieStore.set(VISITOR_COOKIE_KEY, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}

export async function getRequestIp() {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }

  return requestHeaders.get("x-real-ip") ?? null;
}
