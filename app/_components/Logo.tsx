import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="relative block size-14 lg:size-20">
      <Image
        priority
        src="/logo.png"
        alt="logo"
        fill
        className="rounded-full object-cover"
      />
    </Link>
  )
}

export default Logo
