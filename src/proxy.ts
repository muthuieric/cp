import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token }) {
      // Must be authenticated to access protected routes
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/admin-view",
    "/admin-view/:path*",
  ],
};
