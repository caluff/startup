import React from 'react'
import { EyeIcon, ArrowUpRight } from 'lucide-react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, formatDate } from '@/lib/utils'

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, _id, poster, image, description } = post

  return (
    <article className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow max-w-sm w-full">
      <div className="relative aspect-[16/10] rounded-t-lg overflow-hidden">
        <img
          src={poster || image}
          alt={title}
          style={{ viewTransitionName: `sImage-${title}` }}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 left-3 flex gap-2">
          <Link
            href={`/?category=${category?.toString()}`}
            className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white"
          >
            {category}
          </Link>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
            <EyeIcon className="w-4 h-4" />
            <span className="text-sm">{views}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-5 line-clamp-1">{title}</h3>

        <Link
          href={`/user/${author?.id}`}
          className="flex items-center gap-3 mb-6 hover:opacity-80"
        >
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{author?.name}</p>
            <p className="text-sm text-gray-500">{formatDate(_createdAt)}</p>
          </div>
        </Link>

        <Button asChild className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6">
          <Link href={`/startup/${_id}`} className="flex items-center justify-center gap-2">
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </article>
  )
}

export const StartupCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px]">
    {[...Array(6)].map((_, index) => (
      <Skeleton key={index} className="aspect-[16/10] rounded-lg bg-gray-200 max-w-sm w-full" />
    ))}
  </div>
)

export default StartupCard
