import { NextRequest, NextResponse } from "next/server";
import { verifyFirebaseToken } from "./utils/firebaseAuth";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Allow public assets without authentication check
  if (/^\/(_next|static|favicon.ico|robots.txt)/.test(pathname)) {
    return NextResponse.next();
  }

  // Verify token
  const decodedToken = token ? await verifyFirebaseToken(token) : null;
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublic = publicRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users trying to access protected routes
  if (!decodedToken && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent authenticated users from accessing login page
  if (decodedToken && isPublic) {
    return NextResponse.redirect(new URL("/admin/users", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|robots.txt).*)"],
};
