import ErrorMessage from '@/app/_components/ErrorMessage'
import { render, screen } from '@testing-library/react'

describe('ErrorMessage', () => {
  it('should render an error message', () => {
    render(<ErrorMessage message="Error message" />)

    expect(screen.getByText(/error message/i)).toBeInTheDocument()
    expect(screen.getByRole('error-icon')).toBeInTheDocument()
  })
})
