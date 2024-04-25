import { lucia } from '@/lib/auth'
import { getUserByUsername } from '@/db/client/users'

import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  const username = formData.get('username')
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return new Response(JSON.stringify({ error: 'Invalid username' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  const password = formData.get('password')
  if (
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255
  ) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const existingUser = await getUserByUsername(username)

  if (!existingUser) {
    return new Response(
      JSON.stringify({
        error: 'Incorrect username or password',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  const validPassword = await Bun.password.verify(
    password,
    existingUser.password,
  )

  if (!validPassword) {
    return new Response(
      JSON.stringify({
        error: 'Incorrect username or password',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  return new Response()
}
