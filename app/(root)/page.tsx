import { SearchForm } from '@/components/search-form'
import StartupCard, { StartupTypeCard } from '@/components/startup-card'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { STARTUP_QUERY } from '@/sanity/lib/queries'
import { Rocket, SparkleIcon, Users } from 'lucide-react'

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
        <div className="max-w-7xl mx-auto px-6">
          {/* Stats bar */}
          <div className="flex items-center justify-center gap-12 mb-16">
            {[
              { icon: Rocket, label: 'Active Startups', value: '500+' },
              { icon: Users, label: 'Entrepreneurs', value: '2.5K+' },
              { icon: SparkleIcon, label: 'Success Rate', value: '89%' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 text-white group">
                <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm group-hover:shadow-md transition-all">
                  <stat.icon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              <span className="text-black">Pitch Your Startup,</span>{' '}
              <span className="text-white">Connect With Entrepreneurs</span>
            </h1>

            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions. Join our
              thriving community of innovators today.
            </p>

            <div className="max-w-2xl mx-auto">
              <SearchForm query={query} />
            </div>
          </div>
        </div>
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
