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
