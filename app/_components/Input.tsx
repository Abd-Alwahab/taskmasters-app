import { ComponentPropsWithRef } from 'react'

type Props = ComponentPropsWithRef<'input'> & {
  hasError?: string
}

function Input({ hasError, ...props }: Props) {
  return (
    <input
      className={`w-full rounded-lg border ${hasError ? 'border-red-500' : 'border-gray-300'} px-2.5 py-3`}
      {...props}
      autoComplete="off"
      role="input"
    />
  )
}

export default Input
