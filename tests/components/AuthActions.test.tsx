import AuthActions from '@/app/_components/AuthActions'
import { AuthProvider } from '@/app/_context/auth'
import { User } from '@supabase/supabase-js'
import { render, screen } from '@testing-library/react'

describe('AuthActions', () => {
  it('should render login/signup button when not logged in', () => {
    render(<AuthActions />)
    const loginText = screen.getByText(/login \/ signup/i)
    const loginLink = screen.getByRole('link')

    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
    expect(loginText).toBeInTheDocument()
  })

  it('should render logout button when logged in', () => {
    render(
      <AuthProvider currentUser={{ id: '1' } as User}>
        <AuthActions />
      </AuthProvider>,
    )

    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })
})
