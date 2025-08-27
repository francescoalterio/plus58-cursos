import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path === "/register") {
    const sp = req.nextUrl.searchParams;
    const invite = sp.get("invite") || sp.get("inviteId");
    if (!invite) return NextResponse.rewrite(new URL("/404", req.url));
  }
  if (path.startsWith("/dashboard")) {
    const token = req.cookies.get("fb_id_token")?.value;
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", path);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/dashboard/:path*"],
};
