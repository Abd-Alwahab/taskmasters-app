import Image from 'next/image'
import Link from 'next/link'

function LogoutHomePage() {
  return (
    <div className="relative flex h-full flex-col items-center rounded-lg bg-white pt-44 lg:pt-32">
      <div className="absolute right-10 top-16 size-6 rounded-full bg-amber-400 shadow-md lg:right-10 lg:top-24 lg:size-11" />
      <div className="absolute left-10 top-8 size-10 rounded-full bg-amber-300 shadow-md lg:left-10 lg:top-12 lg:size-20" />
      <div className="absolute left-14 top-8 size-10 rounded-full bg-white lg:left-14  lg:top-14 lg:size-20" />
      <div className="absolute bottom-12 left-20 hidden rounded-full bg-blue-800 shadow-md lg:block  lg:size-20">
        <div className="ml-[-10px] size-12 bg-white" />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 text-center lg:max-w-4xl">
        <h1 className="text-3xl font-bold lg:text-6xl">
          <span className="text-amber-500">Daily</span> Tasks Planner
        </h1>

        <p className="text-sm leading-7 lg:max-w-[70%]">
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

      <div className="relative mt-auto size-full rounded-lg shadow-lg lg:size-3/5">
        <Image src="/home-page.svg" alt="home page" fill draggable={false} />
      </div>
    </div>
  )
}

export default LogoutHomePage
