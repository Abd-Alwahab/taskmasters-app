'use client'

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-white">
      <h1 className="text-3xl">Something went wrong</h1>
      <p className="mb-4">{error.message}</p>

      <button
        className="rounded-lg border border-amber-500 px-5 py-3 text-lg text-amber-500 transition-all hover:bg-amber-500 hover:text-white"
        onClick={() => reset()}
      >
        Retry
      </button>
    </div>
  )
}

export default Error
