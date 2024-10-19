import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";
    const token = request.cookies.get("token")?.value || "";
    if(isPublicPath && token) {
        const targetPath = "/"
        const {pathname , searchParams} = new URL (request.url)
        if (pathname.startsWith(targetPath)) {
          return NextResponse.next();
        }
      
        const newUrl = new URL(targetPath, request.url);
    
        searchParams.forEach((value, key) => {
          newUrl.searchParams.append(key, value);
        });
        return NextResponse.redirect(newUrl);
    }
    if(!isPublicPath && !token) {
        const targetPath = "/login"
        const {pathname , searchParams} = new URL (request.url)
        if (pathname.startsWith(targetPath)) {
          return NextResponse.next();
        }
      
        const newUrl = new URL(targetPath, request.url);
    
        searchParams.forEach((value, key) => {
          newUrl.searchParams.append(key, value);
        });
        return NextResponse.redirect(newUrl); 
     }
}
 
export const config = {
  matcher: ['/login' , '/signup' , '/'],
}