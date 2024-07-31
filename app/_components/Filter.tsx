'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getPriorityBackgroundColor } from '../_utils/helpers'

type Props = {
  options: { label: string; value: string }[]
  filterField: string
}

function Filter({ options, filterField }: Props) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const activeFilter = searchParams.get(filterField) ?? 'all'

  const handleFilter = (filter: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(filterField, filter)
    replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  return (
    <div className="flex w-fit gap-4 overflow-hidden rounded-md border border-solid border-gray-100 bg-white">
      {options?.map((option) => (
        <button
          key={option.label}
          onClick={() => handleFilter(option.value)}
          className={`px-4 py-3 font-medium text-gray-900 ${activeFilter === option.value ? ` ${getPriorityBackgroundColor(option.value)}` : ''}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default Filter
