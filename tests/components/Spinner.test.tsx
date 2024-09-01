import Spinner from '@/app/_components/Spinner'
import { render, screen } from '@testing-library/react'

describe('Spinner', () => {
  it('should render a spinner', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
