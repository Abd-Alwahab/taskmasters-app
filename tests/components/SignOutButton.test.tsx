import SignOutButton from '@/app/_components/SignoutButton'
import { logoutAction } from '@/app/_lib/actions'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/app/_lib/actions')

describe('SignOutButton', () => {
  it('render the SignOutButton button', () => {
    render(<SignOutButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('render the SignOutButton button', async () => {
    render(<SignOutButton />)
    const user = userEvent.setup()
    const button = screen.getByRole('button')

    await user.click(button)

    expect(logoutAction).toHaveBeenCalled()
  })
})
