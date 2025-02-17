import MdContentBlock from '@/components/markdown-content'
import StartupCard, { StartupTypeCard } from '@/components/startup-card'
import { Skeleton } from '@/components/ui/skeleton'
import { View } from '@/components/view'
import { formatDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
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
    <>
      <section className="pink_container min-h-[280px]! flex flex-col items-center justify-center text-center">
        <p
          className={`bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before:content-['']
           before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px]
            before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px]
             after:border-b-black after:border-l-[10px] after:border-l-transparent inline-block`}
        >
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="heading mt-4 mb-3">{post.title}</h1>
        <p className="sub-heading max-w-3xl! mx-auto">{post.description}</p>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        {post.img && (
          <div className="max-w-4xl mx-auto bg-white/50 p-6 rounded-2xl shadow-lg">
            <img
              src={post.poster}
              alt={'thumbnail'}
              className="w-full h-[400px] rounded-xl object-contain transition-transform duration-300 hover:scale-[1.02]"
              style={{ viewTransitionName: `startup-image-${id}` }}
            />
          </div>
        )}

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white/50 p-6 rounded-2xl">
            {post?.author && (
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-4 items-center hover:opacity-90"
              >
                <Image
                  src={post?.author?.image}
                  alt={'avatar'}
                  width={80}
                  height={80}
                  className="rounded-full drop-shadow-lg ring-4 ring-white"
                />
                <div>
                  <p className="">{post.author?.name}</p>
                  <p className="font-medium text-[16px] text-black text-black-300!">
                    @{post.author?.username}
                  </p>
                </div>
              </Link>
            )}
            <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full text-lg">
              {post?.category}
            </p>
          </div>

          <div className="bg-white/50 p-8 rounded-2xl">
            <h3 className="text-36-bold mb-6">Pitch Details</h3>

            {post?.pitch ? (
              <MdContentBlock content={post?.pitch} />
            ) : (
              <p className="text-gray-500 text-lg italic">
                No pitch details have been provided yet
              </p>
            )}
          </div>
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16">
            <p className="text-36-semibold mb-8">Editor Picks</p>
            <ul className="grid sm:grid-cols-2 gap-5">
              {editorPosts.map((post: StartupTypeCard, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  )
}

export default Page
