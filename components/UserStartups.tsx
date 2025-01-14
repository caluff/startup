import { STARTUP_BY_AUTH_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import StartupCard, { StartupTypeCard } from '@/components/startup-card'

export const UserStartups = async ({ id }: { id: string }) => {
  const startup = await client.fetch(STARTUP_BY_AUTH_QUERY, { id })
  return (
    <>
      {startup.length > 0 ? (
        startup.map((startup: StartupTypeCard) => <StartupCard key={startup?._id} post={startup} />)
      ) : (
        <p className={'no-result'}>No posts yet</p>
      )}
    </>
  )
}
