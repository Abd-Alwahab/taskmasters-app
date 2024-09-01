import Logo from '@/app/_components/Logo'
import { render, screen } from '@testing-library/react'

describe('Logo', () => {
  it('should render a link to the homepage', () => {
    render(<Logo />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('should render the logo image', () => {
    render(<Logo />)
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', expect.stringMatching(/logo.png/i))
    expect(logo).toHaveAttribute('alt', 'logo')
  })
})
