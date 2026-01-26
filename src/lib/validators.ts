export function isUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
    value,
  )
}

// Username validation - only email-safe characters allowed
export const USERNAME_PATTERN = /^[a-zA-Z0-9_-]+$/
export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 31

export function isValidUsernameFormat(username: string): boolean {
  return USERNAME_PATTERN.test(username)
}

export function validateUsername(username: string): {
  valid: boolean
  error?: string
} {
  if (username.length < USERNAME_MIN_LENGTH) {
    return {
      valid: false,
      error: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
    }
  }
  if (username.length > USERNAME_MAX_LENGTH) {
    return {
      valid: false,
      error: `Username cannot exceed ${USERNAME_MAX_LENGTH} characters`,
    }
  }
  if (!isValidUsernameFormat(username)) {
    return {
      valid: false,
      error:
        'Username can only contain letters, numbers, underscores, and hyphens',
    }
  }
  return { valid: true }
}
