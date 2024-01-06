import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/users")) {
    let token = request.cookies.get("jwt") as unknown;
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // const email = await isValidToken(token as string);
  }

  if (request.nextUrl.pathname.startsWith("/farm")) {
    let token = request.cookies.get("jwt") as unknown;
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // const email = await isValidToken(token as string);
  }


  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   // return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
}

// export const config = {
//   // matcher: "/",
//   matcher: ["/booking/:path*","/staff/:path*"],
// };
