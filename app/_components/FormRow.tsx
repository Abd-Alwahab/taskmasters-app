import ErrorMessage from './ErrorMessage'
import { ReactNode } from 'react'

type Props = {
  error?: string
  children?: ReactNode
}
const FormRow = ({ error, children }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {children}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default FormRow
