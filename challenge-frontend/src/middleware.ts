import { withAuth } from 'next-auth/middleware'

export default withAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: ({ req, token }) => {
            const { pathname } = req.nextUrl;
            const publicPaths = ['/produtos'];

            if (publicPaths.some((path) => pathname === path)) {
                return true;
            }

            const publicProductRegex = /^\/produtos\/\d+$/; // Ex.: "/produtos/1", "/produtos/2"
            if (publicProductRegex.test(pathname)) {
                return true;
            }

            return !!token?.access_token;
        },
    },
})

export const config = {
    matcher: '/produtos/:path*',
}
