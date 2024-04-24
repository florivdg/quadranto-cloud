import { lucia } from '@/lib/auth'
import { sequence, defineMiddleware } from 'astro:middleware'

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

const auth = defineMiddleware(async (context, next) => {
  const whitelist = ['/login', '/signup', '/api/auth/login', '/api/auth/signup']

  const reqUrl = new URL(context.request.url)

  if (!context.locals.user && !whitelist.includes(reqUrl.pathname)) {
    /// TODO: Return 401 response when hitting an API route
    return context.redirect('/login')
  }

  return next()
})

export const onRequest = sequence(session, auth)
