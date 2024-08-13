'use client'

import DeleteModal from '@/app/_components/DeleteModal'
import { deleteAccountAction } from '@/app/_lib/actions'
import { useTransition } from 'react'

type Props = {
  onCloseModal?: () => void
}
function DeleteAccountModal({ onCloseModal }: Props) {
  const [pending, startTransition] = useTransition()

  function handleDeleteAccount() {
    startTransition(async () => {
      const result = await deleteAccountAction()

      if (result?.success) onCloseModal?.()
    })
  }
  return (
    <DeleteModal
      onConfirm={() => handleDeleteAccount()}
      pending={pending}
      resource="account"
      onCloseModal={onCloseModal}
    />
  )
}

export default DeleteAccountModal
