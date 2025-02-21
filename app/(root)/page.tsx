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
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
      </section>

      <section className="container px-4 py-10">
        <h2 className="text-2xl font-semibold mb-8">
          {query ? `Search results for ${query}` : 'All Startups'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px]">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="text-gray-500">No startups found</p>
          )}
        </div>
      </section>

      <SanityLive />
    </>
  )
}
