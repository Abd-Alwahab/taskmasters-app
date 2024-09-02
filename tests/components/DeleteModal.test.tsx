import DeleteModal from '@/app/_components/DeleteModal'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('DeleteModal', () => {
  const renderComponent = (
    { pending }: { pending?: boolean } = { pending: false },
  ) => {
    const onCloseModal = vi.fn()
    const onConfirm = vi.fn()

    render(
      <DeleteModal
        onCloseModal={onCloseModal}
        onConfirm={onConfirm}
        pending={pending}
      />,
    )

    return {
      onCloseModal,
      onConfirm,
      cancelButton: screen.getByRole('button', { name: /cancel/i }),
      deleteButton: screen.getByRole('button', {
        name: pending ? /deleting.../i : /delete/i,
      }),
    }
  }

  it('should render the modal', () => {
    renderComponent()

    expect(screen.getByRole('delete-icon')).toBeInTheDocument()
    expect(
      screen.getByText(/are you sure you want to delete this/i),
    ).toBeInTheDocument()
  })

  it('should close the modal when cancel button is clicked', async () => {
    const { onCloseModal, cancelButton } = renderComponent()

    const user = userEvent.setup()
    await user.click(cancelButton)

    expect(onCloseModal).toHaveBeenCalled()
  })

  it('should confirm the deletion when delete button is clicked', async () => {
    const { onConfirm, deleteButton } = renderComponent()

    const user = userEvent.setup()
    await user.click(deleteButton)

    expect(onConfirm).toHaveBeenCalled()
  })

  it('should disable the buttons when pending is true', () => {
    const { cancelButton, deleteButton } = renderComponent({ pending: true })

    expect(cancelButton).toBeDisabled()
    expect(deleteButton).toBeDisabled()
  })
})
