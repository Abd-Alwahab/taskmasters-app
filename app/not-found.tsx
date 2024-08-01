import Link from 'next/link'
import { TbError404 } from 'react-icons/tb'

function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 whitespace-nowrap bg-white">
      <TbError404 size={90} />

      <span className="mb-5 block text-3xl">Page Not Found</span>

      <Link
        href="/"
        className="rounded-lg border border-amber-500 px-5 py-3 text-lg text-amber-500 transition-all hover:bg-amber-500 hover:text-white"
      >
        {' '}
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
