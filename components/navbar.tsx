import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export const Navbar = async () => {
  const clerkUser = await currentUser()

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
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          {clerkUser && <Link href="/startup/create">Create</Link>}
        </div>
      </nav>
    </header>
  )
}
