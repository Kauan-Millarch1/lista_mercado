import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (["/login", "/signup", "/forgot-password"].includes(pathname)) {
    return NextResponse.redirect(new URL("/start", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/forgot-password"]
};
