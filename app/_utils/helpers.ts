export function getPriorityBackgroundColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'bg-green-200 text-gray-900' // Light green for low priority
    case 'medium':
      return 'bg-yellow-300 text-gray-900' // Yellow for medium priority
    case 'high':
      return 'bg-red-400 text-gray-900' // Light red for high priority
    default:
      return 'bg-gray-200 text-gray-900' // Default to gray if priority is invalid
  }
}

export function getPriorityBorderColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'border-green-200' // Light green for low priority
    case 'medium':
      return 'border-yellow-300' // Yellow for medium priority
    case 'high':
      return 'border-red-400' // Light red for high priority
    default:
      return 'border-gray-200' // Default to gray if priority is invalid
  }
}
