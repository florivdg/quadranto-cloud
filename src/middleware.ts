import { sequence, defineMiddleware } from 'astro:middleware'

import { auth } from '@/lib/auth'

/**
 * Middleware for creating and validating sessions using Better Auth.
 */
const session = defineMiddleware(async (context, next) => {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  })

  context.locals.session = session?.session ?? null
  context.locals.user = session?.user ?? null

  return next()
})

/**
 * Middleware for checking if a user is authenticated.
 */
const authMiddleware = defineMiddleware(async (context, next) => {
  const whitelist = ['/login', '/signup', '/password-reset']

  const reqUrl = new URL(context.request.url)

  // Allow all Better Auth API routes through
  if (reqUrl.pathname.startsWith('/api/auth')) {
    return next()
  }

  if (!context.locals.user && !whitelist.includes(reqUrl.pathname)) {
    // Return 401 response when hitting an API route
    if (reqUrl.pathname.startsWith('/api')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    return context.redirect('/login')
  }

  return next()
})

/**
 * Middleware to run the session and auth middleware in sequence.
 */
export const onRequest = sequence(session, authMiddleware)
