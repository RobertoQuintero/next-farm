import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { isValidToken } from "./utils";


export async function middleware(request: NextRequest) {
  let token = request.cookies.get("jwt") as unknown;
  if (request.nextUrl.pathname.startsWith("/users")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // const email = await isValidToken(token as string);
  }

  if (request.nextUrl.pathname==="/farms") {

   
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }else{
      // let id_role = request.cookies.get("id_role");
      // if(id_role?.value!=='1'){
      //   return NextResponse.redirect(new URL("/farms/custom", request.url));
      // }
    }
  }



  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   // return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
}

// export const config = {
//   // matcher: "/",
//   matcher: ["/booking/:path*","/staff/:path*"],
// };
