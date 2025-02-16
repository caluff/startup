import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from '@/components/ui/skeleton'

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, _id, poster, description } = post

  return (
    <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 group transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold line-clamp-1 tracking-tight">{title}</h3>
        <div className="flex items-center gap-2">
          <EyeIcon className="size-5 text-primary transition-colors " />
          <span className="font-medium">{views}</span>
        </div>
      </div>

      <Link
        href={`/user/${author?.id}`}
        className="hover:opacity-90 hover:bg-primary/30 transition-all duration-300 rounded-xl p-2 mt-2"
      >
        <div className="flex items-center gap-4">
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full ring-2 ring-black/5"
          />

          <div className="flex-1">
            <p className="font-medium line-clamp-1 text-gray-700">{author?.name}</p>

            <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full ">
              {formatDate(_createdAt)}
            </p>
          </div>
        </div>
      </Link>

      <div className="mt-4 overflow-hidden rounded-xl">
        <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all mb-4">
          {description}
        </p>
        <img
          src={poster || post.image}
          alt="startup preview"
          style={{ viewTransitionName: `startup-image-${_id}` }}
          className="aspect-video w-full object-contain transition-transform duration-300 "
        />
      </div>

      <div className="mt-auto pt-10 flex items-center justify-between gap-4">
        <Link
          href={`/?query=${category?.toLowerCase()}`}
          className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
        >
          #{category}
        </Link>

        <Button
          className="rounded-full bg-black-200 font-medium text-[16px] text-white px-5 py-3 transition-all duration-300 hover:bg-primary/80 "
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
        <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-400" />
      </li>
    ))}
  </>
)

export default StartupCard
