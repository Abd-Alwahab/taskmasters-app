'use client'

import { useRouter } from 'next/navigation'
import { RiErrorWarningFill } from 'react-icons/ri'

type Props = {
  onCloseModal?: () => void
}
function WarningModal({ onCloseModal }: Props) {
  const { push } = useRouter()

  return (
    <div className="flex w-[500px] flex-col items-center gap-6">
      <RiErrorWarningFill fontSize={80} color="red" />

      <p className="text-center text-lg">
        You can not delete this category because it has tasks, please delete
        them first
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => onCloseModal?.()}
          className="rounded-lg border border-gray-900 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none  "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-gray-950 px-3 py-2 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-gray-300"
          onClick={() => push('/tasks')}
        >
          Open Tasks
        </button>
      </div>
    </div>
  )
}

export default WarningModal
