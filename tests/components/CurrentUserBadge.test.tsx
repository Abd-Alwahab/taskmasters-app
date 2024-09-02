import CurrentUserBadge from '@/app/_components/CurrentUserBadge'
import { AuthProvider } from '@/app/_context/auth'
import { render, screen } from '@testing-library/react'

describe('CurrentUserBadge', () => {
  it('should render null when not logged in', () => {
    const { container } = render(<CurrentUserBadge />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render the user name and image when logged in', () => {
    render(
      <AuthProvider
        currentUser={
          {
            id: '1',
            user_metadata: {
              name: 'John Doe',
              picture: 'photo.jpg',
            },
          } as any
        }
      >
        <CurrentUserBadge />
      </AuthProvider>,
    )

    const image = screen.getByRole('img')
    const text = screen.getByText(/john doe/i)
    expect(image).toHaveAttribute('src', 'photo.jpg')
    expect(text).toBeInTheDocument()
  })
})
