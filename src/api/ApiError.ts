import type { FetchError } from 'ofetch'

export class ApiError extends Error {
  fetchError: FetchError | null = null

  constructor(message: string) {
    super(message)
    this.name = 'QuadrantoApiError'

    if (Error.captureStackTrace) Error.captureStackTrace(this, ApiError)
  }

  static fromFetchError(error: FetchError): ApiError {
    const apiError = new ApiError(`API request failed: ${error.message}`)
    apiError.fetchError = error
    return apiError
  }
}
