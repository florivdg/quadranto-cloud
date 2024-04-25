import { lucia } from '@/lib/auth'
import { sequence, defineMiddleware } from 'astro:middleware'

/**
 * Middleware for creating and validating sessions.
 */
const session = defineMiddleware(async (context, next) => {
  const authorizationHeader = context.request.headers.get('Authorization')
  const sessionId =
    context.cookies.get(lucia.sessionCookieName)?.value ??
    lucia.readBearerToken(authorizationHeader ?? '') ??
    null

  if (!sessionId) {
    context.locals.user = null
    context.locals.session = null
    return next()
  }

  const { session, user } = await lucia.validateSession(sessionId)

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  }

  context.locals.session = session
  context.locals.user = user

  return next()
})

/**
 * Middleware for checking if a user is authenticated.
 */
const auth = defineMiddleware(async (context, next) => {
  const whitelist = [
    '/login',
    '/signup',
    '/password-reset',
    '/api/auth/login',
    '/api/auth/signup',
  ]

  const reqUrl = new URL(context.request.url)

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
export const onRequest = sequence(session, auth)
