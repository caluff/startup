import { Ping } from '@/components/ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'

export const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id })

  await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit()

  return (
    <div className={'flex justify-end items-center mt-5 fixed bottom-3 right-3'}>
      <div className={'absolute -top-2 -right-2'}>
        <Ping />
      </div>
      <p className={'font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize'}>
        <span className={'font-black'}>Views: {totalViews}</span>
      </p>
    </div>
  )
}
