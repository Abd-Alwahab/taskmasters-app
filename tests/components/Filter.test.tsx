import Filter from '@/app/_components/Filter'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>()
  const { useRouter } =
    await vi.importActual<typeof import('next-router-mock')>('next-router-mock')
  const usePathname = vi.fn().mockImplementation(() => {
    const router = useRouter()
    return router.pathname
  })
  const useSearchParams = vi.fn().mockImplementation(() => {
    const router = useRouter()
    return new URLSearchParams(router.query?.toString())
  })
  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  }
})

describe('Filter', () => {
  // Mock the usePathname function to return a specific pathname
  const options = [
    { label: 'All', value: 'all' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Low', value: 'low' },
  ]
  const renderFilter = () => {
    render(<Filter options={options} filterField="priority" />)

    return {
      options,
      buttonOptions: screen.getAllByRole('button'),
    }
  }
  it('should render list of options', () => {
    const { buttonOptions } = renderFilter()

    expect(buttonOptions).toHaveLength(4)

    options.forEach((option, index) => {
      expect(buttonOptions[index]).toHaveTextContent(option.label) // screen.getByText(option.label)).toBeInTheDocument()
    })
  })
})
