import Input from '@/app/_components/Input'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
  it('should update input value when typing', async () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    const input = screen.getByRole('input')
    const user = userEvent.setup()
    await user.type(input, 'test')

    expect(input).toHaveValue('test')
    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onChange).toHaveBeenLastCalledWith(expect.any(Object))
  })
})
