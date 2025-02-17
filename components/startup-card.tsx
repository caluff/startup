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
    <li className="group relative overflow-hidden bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={poster ? poster : image}
          alt="startup preview"
          style={{ viewTransitionName: `sImage-${title}` }}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        {/* Category Tag */}
        <Link
          href={`/?query=${category?.toLowerCase()}`}
          className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white transition-colors"
        >
          {category}
        </Link>

        {/* Views Counter */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <EyeIcon className="size-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">{views}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight line-clamp-1 mb-4">{title}</h3>

        {/* Author Section */}
        <Link href={`/user/${author?.id}`} className="flex items-center gap-3 mb-6 group/author">
          <div className="relative">
            <Image
              src={author?.image!}
              alt={author?.name!}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-gray-100"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-primary/50 transform scale-110 opacity-0 group-hover/author:opacity-100 transition-all duration-300" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{author?.name}</p>
            <p className="text-sm text-gray-500">{formatDate(_createdAt)}</p>
          </div>
        </Link>

        {/* Action Button */}
        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-6 font-medium group/button"
          asChild
        >
          <Link href={`/startup/${_id}`} className="flex items-center justify-center gap-2">
            View Details
            <ArrowUpRight className="size-4 transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
    </li>
  )
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)} className="animate-pulse">
        <Skeleton className="w-full h-[360px] rounded-3xl bg-gray-200" />
      </li>
    ))}
  </>
)

export default StartupCard
