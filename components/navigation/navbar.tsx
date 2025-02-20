import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { SidebarTrigger } from '../ui/sidebar'

export const Navbar = async () => {
  return (
    <header className={'px-5 py-3 bg-white shadow-xs font-work-sans'}>
      <nav className={'flex justify-between items-center'}>
        <Link href={'/'}>
          <Image src={'/logo-startup.png'} alt={'logo'} width={120} height={40} />
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
            <SidebarTrigger />
          </SignedOut>

          <SignedIn>
            <SidebarTrigger />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
