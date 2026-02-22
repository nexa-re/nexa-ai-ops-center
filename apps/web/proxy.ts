import { withAuth } from "next-auth/middleware";

// Default NextAuth middleware export protects matching routes
export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  // Protect all routes except the auth API itself and static assets
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)"],
};
