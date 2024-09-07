import TextArea from '@/app/_components/TextArea'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('TextArea', () => {
  it('should update textarea value when typing', async () => {
    const onChange = vi.fn()
    render(<TextArea onChange={onChange} />)

    const textarea = screen.getByRole('textarea')
    const user = userEvent.setup()
    await user.type(textarea, 'test')

    expect(textarea).toHaveValue('test')
    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Object))
  })
})
