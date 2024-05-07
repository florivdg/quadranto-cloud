import { ofetch } from 'ofetch'

import type { ApiError } from './ApiError'

/**
 * Pre-configured backend API client.
 */
const backendClient = ofetch.create({
  baseURL: '/api/',
  credentials: 'include',
})

export { backendClient }

/**
 * API response tuple.
 */
export type ApiResponse<T> = [T | null, ApiError | null]
