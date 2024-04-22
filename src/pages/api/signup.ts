import { PostgresError } from 'postgres'
import type { APIContext } from 'astro'
import { lucia } from '@/lib/auth'
import { db } from '@/db'
import { users } from '@/db/schema'

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  const username = formData.get('username')
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return new Response(
      JSON.stringify({
        error: 'Invalid username',
      }),
      {
        status: 400,
      },
    )
  }
  const password = formData.get('password')
  if (
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255
  ) {
    return new Response(
      JSON.stringify({
        error: 'Invalid password',
      }),
      {
        status: 400,
      },
    )
  }

  const hashedPassword = await Bun.password.hash(password)

  try {
    const user = await db
      .insert(users)
      .values({ username, password: hashedPassword })
      .returning()

    const userId = user[0].id

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return new Response()
  } catch (e) {
    if (e instanceof PostgresError && e.code === '23505') {
      return new Response(
        JSON.stringify({
          error: 'Username already used',
        }),
        {
          status: 400,
        },
      )
    }
    return new Response(
      JSON.stringify({
        error: 'An unknown error occurred',
      }),
      {
        status: 500,
      },
    )
  }
}
