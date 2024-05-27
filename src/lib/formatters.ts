import { DateFormatter } from '@internationalized/date'

export function formatDate(dateStr: string, locale?: string) {
  /// Date formatter for the due date field
  const df = new DateFormatter(locale ?? navigator.language, {
    dateStyle: 'long',
  })
  return df.format(new Date(dateStr))
}
