import Image from 'next/image'
import { loginAction } from '../_lib/actions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

const Login = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 bg-white">
      <h1 className="text-2xl lg:text-3xl">Login to access the Planner</h1>

      <form action={loginAction}>
        <button className="group flex gap-3 rounded-full border border-quill-gray-900 px-12 py-3 transition-all hover:bg-quill-gray-950">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span className="text-base font-medium transition-all hover:shadow-lg group-hover:text-white lg:text-lg">
            Login with Google
          </span>
        </button>
      </form>
    </div>
  )
}

export default Login
