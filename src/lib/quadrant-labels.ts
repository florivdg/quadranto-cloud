import type { QuadrantLabels, Priority } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'

/**
 * Emoji mapping for each priority/quadrant.
 */
const QUADRANT_EMOJIS: Record<Priority, string> = {
  urgent: '🔥',
  high: '⏰',
  medium: '⚡',
  low: '💤',
}

/**
 * Get the emoji for a given priority.
 */
export function getQuadrantEmoji(priority: Priority): string {
  return QUADRANT_EMOJIS[priority]
}

/**
 * Resolve the quadrant label for a given priority.
 * Returns the custom label if set, otherwise falls back to i18n default.
 */
export function resolveQuadrantLabel(
  priority: Priority,
  customLabels: QuadrantLabels | null | undefined,
  locale: Locale,
): string {
  const t = createTranslator(locale)

  // Check for custom label first
  const customLabel = customLabels?.[priority]
  if (customLabel?.trim()) {
    return customLabel
  }

  // Fall back to i18n defaults
  switch (priority) {
    case 'urgent':
      return t.quadrants.urgentImportant
    case 'high':
      return t.quadrants.importantNotUrgent
    case 'medium':
      return t.quadrants.urgentNotImportant
    case 'low':
      return t.quadrants.notImportantNotUrgent
  }
}

/**
 * Get the default label for a priority from i18n.
 */
export function getDefaultQuadrantLabel(
  priority: Priority,
  locale: Locale,
): string {
  const t = createTranslator(locale)

  switch (priority) {
    case 'urgent':
      return t.quadrants.urgentImportant
    case 'high':
      return t.quadrants.importantNotUrgent
    case 'medium':
      return t.quadrants.urgentNotImportant
    case 'low':
      return t.quadrants.notImportantNotUrgent
  }
}
