import { MdOutlineError } from 'react-icons/md'

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-1 text-sm text-red-400">
      <MdOutlineError role="error-icon" />
      <span>{message}</span>
    </div>
  )
}

export default ErrorMessage
