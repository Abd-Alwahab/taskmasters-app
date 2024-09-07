import { ComponentPropsWithRef } from 'react'

type Props = ComponentPropsWithRef<'textarea'>

function TextArea({ ...props }: Props) {
  return (
    <textarea
      role="textarea"
      className="w-full rounded-lg border border-gray-300 px-2.5 py-3"
      {...props}
    />
  )
}

export default TextArea
