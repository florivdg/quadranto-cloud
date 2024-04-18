import { describe, test, expect } from 'bun:test'
import { isUUID } from './validators'

describe('isUUID', () => {
  test('should return true for valid UUIDs', () => {
    expect(isUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
    expect(isUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true)
  })

  test('should return false for invalid UUIDs', () => {
    expect(isUUID('123e4567-e89b-12d3-a456-42661417400')).toBe(false) // Missing a character
    expect(isUUID('123e4567-e89b-12d3-a456-4266141740000')).toBe(false) // Extra character
    expect(isUUID('123e4567-e89b-12d3-a456-42661417400g')).toBe(false) // Invalid character (g)
    expect(isUUID('')).toBe(false) // Empty string
  })

  test('should return false for non-string inputs', () => {
    // @ts-ignore: Deliberately testing incorrect type
    expect(isUUID(12345678)).toBe(false)
    // @ts-ignore: Deliberately testing incorrect type
    expect(isUUID(null)).toBe(false)
    // @ts-ignore: Deliberately testing incorrect type
    expect(isUUID(undefined)).toBe(false)
  })
})
