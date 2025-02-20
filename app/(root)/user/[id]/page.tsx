import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { UserStartups } from '@/components/UserStartups'
import { Suspense } from 'react'
import { StartupCardSkeleton } from '@/components/startup-card'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id: id })

  if (!user) return notFound()

  return (
    <>
      <section
        className={'w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10'}
      >
        <div
          className={
            'w-80 px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-primary border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full'
          }
        >
          <div
            className={`w-11/12 bg-background border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 
              after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-1 
              after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 
              before:left-0  before:-skew-y-6 before:w-full before:h-[60px] before:bg-black  before:-z-1 before:rounded-[20px] 
              shadow-100`}
          >
            <h3 className={'text-[24px] font-black text-black uppercase text-center'}>
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className={'rounded-full object-cover border-[3px] border-black'}
          />
          <p className={'text-[30px] font-extrabold text-white mt-7 text-center'}>
            @{user?.username}
          </p>
          <p className={'mt-1 text-center font-normal text-sm text-white-100/80'}>{user?.bio}</p>
        </div>
        <div className={'flex-1 flex flex-col gap-5 lg:-mt-5'}>
          <ul className={'grid sm:grid-cols-2 gap-5'}>
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={user._id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  )
}
export default Page
