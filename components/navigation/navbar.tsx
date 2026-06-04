import { Button } from '@/components/ui/button'
import { getCurrentAuthor } from '@/lib/auth'
import { signOutAction } from '@/lib/session-actions'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { SidebarTrigger } from '../ui/sidebar'

export const Navbar = async () => {
  const author = await getCurrentAuthor()

  return (
    <header className={'px-5 py-3 bg-background shadow-xs font-work-sans'}>
      <nav className={'flex justify-between items-center'}>
        <Link href={'/'}>
          <Image src={'/logo-startup.png'} alt={'logo'} width={120} height={40} />
        </Link>

        <div className="flex items-center gap-4">
          {author ? (
            <>
              <Link href={`/user/${author._id}`} className="text-sm font-semibold text-gray-800">
                {author.name}
              </Link>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
          <SidebarTrigger />
        </div>
      </nav>
    </header>
  )
}
