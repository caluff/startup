'use server'

import { parseServerActionResponse } from '@/lib/utils'
import { writeClient } from '@/sanity/lib/write-client'
import { currentUser, User } from '@clerk/nextjs/server'
import slugify from 'slugify'

export const createPitch = async (state: any, form: FormData, pitch: string) => {
  const clerkUser: User | null = await currentUser()

  if (!clerkUser) return parseServerActionResponse({ error: 'Not signed in', status: 'ERROR' })
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch')
  )
  const slug = slugify(title as string, { lower: true, strict: true })

  try {
    const startup = {
      title,
      description,
      category,
      image: link ?? '',
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: clerkUser?.id,
      },
      pitch,
    }
    const result = await writeClient.create({ _type: 'startup', ...startup })
    return parseServerActionResponse({ ...result, error: '', status: 'SUCCESS' })
  } catch (error) {
    return parseServerActionResponse({ error: JSON.stringify(error), status: 'ERROR' })
  }
}
