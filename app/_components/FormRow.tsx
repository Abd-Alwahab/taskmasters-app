import ErrorMessage from './ErrorMessage'
import { ReactNode } from 'react'

type Props = {
  error?: string
  children?: ReactNode
  label?: string
}
const FormRow = ({ error, children, label }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      )}

      {children}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default FormRow
