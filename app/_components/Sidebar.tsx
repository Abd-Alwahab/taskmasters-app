import Navigation from './Navigation'
import Logo from './Logo'
import AuthActions from './AuthActions'

function Sidebar() {
  return (
    <div className="flex h-full flex-col justify-between rounded-lg bg-white pt-4 shadow-lg">
      <div className="relative mx-auto block size-20 pt-2">
        <Logo />
      </div>
      <div className="z-10  flex flex-1  flex-col justify-between gap-6 pb-10 pl-6 transition-all">
        <Navigation />

        <AuthActions />
      </div>
    </div>
  )
}

export default Sidebar
