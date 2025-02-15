import { SearchForm } from '@/components/search-form'
import StartupCard, { StartupTypeCard } from '@/components/startup-card'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { STARTUP_QUERY } from '@/sanity/lib/queries'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query
  const params = { search: query || null }
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params })

  return (
    <>
      <section className={'pink_container'}>
        <h1 className={'heading'}>
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className={'sub-heading max-w-3xl!'}>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className={'px-6 py-10 max-w-7xl mx-auto'}>
        <p className={'font-semibold text-[30px] text-black'}>
          {query ? `Search results for ${query}` : 'All Startups'}
        </p>
        <ul className={'mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5'}>
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className={'no-results'}>No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}
