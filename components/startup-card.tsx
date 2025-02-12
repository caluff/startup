import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from '@/components/ui/skeleton'

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, _id, image, description } = post

  return (
    <li className="startup-card group transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <p className="startup_card_date font-medium">{formatDate(_createdAt)}</p>
        <div className="flex items-center gap-2">
          <EyeIcon className="size-5 text-primary transition-colors group-hover:text-black" />
          <span className="font-medium">{views}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex-1 space-y-1.5">
          <Link href={`/user/${author?._id}`} className="block hover:opacity-80">
            <p className="font-medium line-clamp-1 text-gray-700">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`} className="block hover:opacity-90">
            <h3 className="text-2xl font-semibold line-clamp-1 tracking-tight">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`} className="shrink-0 hover:opacity-90">
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full ring-2 ring-black/5"
          />
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl">
        <Link href={`/startup/${_id}`} className="block">
          <p className="startup-card_desc mb-4">{description}</p>
          <img
            src={image}
            alt="startup preview"
            style={{ viewTransitionName: `startup-image-${_id}` }}
            className="aspect-video w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          href={`/?query=${category?.toLowerCase()}`}
          className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
        >
          #{category}
        </Link>
        <Button
          className="startup-card_btn transition-all duration-300 hover:bg-primary hover:text-black"
          asChild
        >
          <Link href={`/startup/${_id}`}>View Details</Link>
        </Button>
      </div>
    </li>
  )
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)} className="animate-pulse">
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
)

export default StartupCard
