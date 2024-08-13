import dynamic from 'next/dynamic'
import Input from '../_components/Input'
import Modal, { ModalWindow, OpenModal } from '../_components/Modal'
import { createClient } from '../_utils/supabase/server'

const DeleteAccountModal = dynamic(
  () => import('../_features/account/DeleteAccountModal'),
)

async function Page() {
  const {
    data: { user },
  } = await createClient().auth.getUser()
  return (
    <div className="flex h-full flex-col gap-6 rounded-lg bg-white lg:p-10">
      <h1 className="lg:text-3xl">Account</h1>

      <div className="flex max-w-md flex-col gap-5">
        <Input
          type="text"
          value={user?.user_metadata?.name}
          disabled
          readOnly
        />
        <Input type="text" value={user?.email} disabled readOnly />
      </div>
      <Modal>
        <OpenModal name="delete-account">
          <button className="flex w-fit items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300">
            <span>Delete Account</span>
          </button>
        </OpenModal>

        <ModalWindow name="delete-account" label="Delete Account">
          <DeleteAccountModal />
        </ModalWindow>
      </Modal>
      <span className="text-xs font-medium text-red-500">
        * All data related to your account will be permanently deleted upon
        deleting your account.
      </span>
    </div>
  )
}

export default Page
