import { FaTrashCan } from 'react-icons/fa6'

type Props = {
  onCloseModal?: () => void
  onConfirm: () => void
  pending?: boolean
  resource?: string
}
function DeleteModal({ resource, onCloseModal, onConfirm, pending }: Props) {
  return (
    <div className="flex flex-col items-center gap-5">
      <FaTrashCan fontSize={40} />

      <p>Are you sure you want to delete this {resource}?</p>

      <div className="flex gap-4">
        <button
          disabled={pending}
          onClick={() => onCloseModal?.()}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none  dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white "
        >
          Cancel
        </button>

        <button
          disabled={pending}
          type="submit"
          className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={() => onConfirm()}
        >
          {pending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default DeleteModal
