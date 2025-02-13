import React from 'react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Navbar = async () => {
  const session = await auth()
  return (
    <header className={'px-5 py-3 bg-white shadow-xs font-work-sans'}>
      <nav className={'flex justify-between items-center'}>
        <Link href={'/'}>
          <Image src={'/logo-startup.png'} alt={'logo'} width={120} height={40} />
        </Link>
        <div className={'flex items-center gap-5 text-black'}>
          {session && session.user ? (
            <>
              <Link href={'/startup/create'}>
                <span className={'max-sm:hidden'}>Create</span>
                <BadgePlus className={'size-6 sm:hidden text-red-500'} />
              </Link>
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/' })
                }}
              >
                <button type={'submit'}>
                  <span className={'max-sm:hidden'}>Logout</span>
                  <LogOut className={'size-6 sm:hidden text-red-500'} />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className={'size-10'}>
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server'
                await signIn('github')
              }}
            >
              <button type={'submit'}>
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
