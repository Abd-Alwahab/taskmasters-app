'use client'

import { useRouter } from 'next/navigation'

function NoCategoriesFound() {
  const { push } = useRouter()
  return (
    <div className="flex size-full flex-col items-center justify-center gap-8">
      <span className="text-4xl font-semibold">No categories found</span>
      <button
        className="rounded-lg bg-gray-900 px-3 py-2 text-lg text-white"
        onClick={() => push('/categories')}
      >
        Create New Category
      </button>
    </div>
  )
}

export default NoCategoriesFound
