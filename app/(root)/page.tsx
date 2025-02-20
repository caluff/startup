import StartupCard, { StartupTypeCard } from '@/components/startup-card'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { STARTUP_QUERY } from '@/sanity/lib/queries'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>
}) {
  const query = (await searchParams).query
  const category = (await searchParams).category
  const params = { search: query || null, category: category || null }
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params })

  return (
    <>
      <section className={'pink_container'}>
        <h1 className={'heading'}>
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className={'font-medium text-[20px] text-white  text-center break-words max-w-3xl!'}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
      </section>

      <section className={'px-6 py-10 max-w-7xl mx-auto'}>
        <p className={'font-semibold text-[30px] text-black'}>
          {query ? `Search results for ${query}` : 'All Startups'}
        </p>
        <ul className={'mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5'}>
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className={'text-black-100 text-sm font-normal'}>No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}
