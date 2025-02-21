import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { SidebarTrigger } from '../ui/sidebar'
import CustomSignUpButton from './SignUpButton'
import CustomSignInButton from './SignInButton'

export const Navbar = async () => {
  return (
    <header className={'px-5 py-3 bg-background shadow-xs font-work-sans'}>
      <nav className={'flex justify-between items-center'}>
        <Link href={'/'}>
          <Image src={'/logo-startup.png'} alt={'logo'} width={120} height={40} />
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <CustomSignUpButton />
            <CustomSignInButton />
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
