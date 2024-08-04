import { format } from 'date-fns'

export const FULL_DATE_FORMAT = "MMMM d, yyyy 'at' h:mm:ss a zzzz"
export const DEFAULT_DATE_FORMAT = 'yyyy, MMMM, dd'

export const formatDate = (
  dateValue: string,
  dateFormat = DEFAULT_DATE_FORMAT,
) => {
  return format(dateValue, dateFormat)
}
