import Image from 'next/image'
import Link from 'next/link'

function LogoutHomePage() {
  return (
    <div className="relative flex h-full flex-col items-center rounded-lg bg-white pt-32">
      <div className="absolute right-10 top-24 size-11 rounded-full bg-amber-400 shadow-md" />
      <div className="absolute left-10 top-12 size-20 rounded-full bg-amber-300 shadow-md" />
      <div className="absolute left-14 top-14 size-20 rounded-full bg-white" />
      <div className="absolute bottom-12 left-20 size-36 rounded-full bg-blue-800  shadow-md">
        <div className="size-24 rounded-lg bg-white" />
      </div>

      <div className="flex max-w-4xl flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-6xl font-bold">
          <span className="text-amber-500">Daily</span> Tasks Planner
        </h1>

        <p className="max-w-[70%] text-sm leading-7">
          Conquer your to-do list with our intuitive task management platform,
          Effortlessly track your progress with detailed statistics.
        </p>

        <Link
          href="/login"
          className="rounded-lg bg-amber-500 px-3 py-2 text-lg text-white transition-all hover:translate-y-[-3px] hover:scale-[1.02] hover:shadow-lg"
        >
          Get Started
        </Link>
      </div>

      <div className="relative mt-auto size-3/5 rounded-lg shadow-lg">
        <Image src="/home-page.svg" alt="home page" fill className="" />
      </div>
    </div>
  )
}

export default LogoutHomePage
