import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedRoutes = ["/Users"];
 
  // If the user is not authenticated and is trying to access a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token");
    console.log(token)
    if (!token) {
      // Redirect the user to the login page if not authenticated
      const loginUrl = new URL("/SignIn", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Continue with the request
  return NextResponse.next();
}

// Define the routes where the middleware will apply
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Apply middleware to all routes except static files
};