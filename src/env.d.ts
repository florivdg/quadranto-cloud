// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    session: {
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress?: string | null
      userAgent?: string | null
      userId: string
    } | null
    user: {
      id: string
      name: string
      email: string
      emailVerified: boolean
      image?: string | null
      createdAt: Date
      updatedAt: Date
      username?: string | null
      displayUsername?: string | null
    } | null
    locale: 'en' | 'de'
    localeIsStored: boolean
  }
}
