import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/">
      <Image
        priority
        src="/logo.png"
        alt="logo"
        width={70}
        height={70}
        className="rounded-full"
      />
    </Link>
  )
}

export default Logo
