import MdContentBlock from '@/components/markdown-content'
import StartupCard, { StartupTypeCard } from '@/components/startup-card'
import { Skeleton } from '@/components/ui/skeleton'
import { View } from '@/components/view'
import { formatDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { GlobeIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: 'best-teach',
    }),
  ])

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-100 text-pink-800 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-4 sm:mb-6 animate-fade-in">
            {formatDate(post?._createdAt)}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
            {post.email && (
              <a
                href={`mailto:${post.email}`}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-100 text-pink-800 rounded-full text-xs sm:text-sm font-medium hover:bg-pink-200 transition-colors"
              >
                <MailIcon className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                {post.email}
              </a>
            )}
            {post.phone && (
              <a
                href={`callto:${post.phone}`}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-100 text-pink-800 rounded-full text-xs sm:text-sm font-medium hover:bg-pink-200 transition-colors"
              >
                <PhoneIcon className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                {post.phone}
              </a>
            )}
            {post.website && (
              <a
                href={post.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-100 text-pink-800 rounded-full text-xs sm:text-sm font-medium hover:bg-pink-200 transition-colors"
              >
                <GlobeIcon className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        {(post.poster || post.image) && (
          <div className="max-w-4xl mx-auto bg-white/50 p-6 rounded-2xl shadow-lg">
            <img
              src={post.poster ? post.poster : post.image}
              alt={'thumbnail'}
              className="w-full h-[400px] rounded-xl object-contain transition-transform duration-300 hover:scale-[1.02]"
              style={{ viewTransitionName: `sImage-${post.title}` }}
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              {post?.pitch ? (
                <MdContentBlock content={post?.pitch} />
              ) : (
                <p className="text-gray-500 text-center italic py-12">
                  No pitch details have been provided yet
                </p>
              )}
            </div>

            {post?.author && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8 pb-2 border-t">
                <Link
                  href={`/user/${post.author?.id}`}
                  className="flex items-center gap-6 mt-8 group"
                >
                  <div className="relative">
                    <Image
                      src={post?.author?.image}
                      alt={post.author?.name}
                      width={90}
                      height={90}
                      className="rounded-full ring-4 ring-pink-100 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-pink-300 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {post.author?.name}
                    </h3>
                    <p className="text-gray-600">@{post.author?.username}</p>
                  </div>
                </Link>
                <span className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-pink-200">
                  {post?.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Editor's Picks</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {editorPosts.map((post: StartupTypeCard, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto mt-16">
          <Suspense fallback={<Skeleton className="h-40 rounded-2xl" />}>
            <View id={id} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default Page
