'use server'

import { getCurrentAuthor } from '@/lib/auth'
import { parseServerActionResponse } from '@/lib/utils'
import { writeClient } from '@/sanity/lib/write-client'
import slugify from 'slugify'

type UploadedPoster = {
  _id: string
}

export const createPitch = async (
  _state: unknown,
  form: FormData,
  pitch: string,
  poster: UploadedPoster | null
) => {
  const { title, description, category, link, email, phone, website } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch')
  )

  const slug = slugify(title as string, { lower: true, strict: true })
  const author = await getCurrentAuthor()

  if (!author?._id) {
    return parseServerActionResponse({ error: 'Not signed in', status: 'ERROR' })
  }

  try {
    const startup = {
      title,
      description,
      category,
      image: link ?? '',
      slug: {
        _type: 'slug',
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: author._id,
      },
      email,
      phone,
      website,
      ...(poster
        ? {
            poster: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: poster._id,
              },
            },
          }
        : {}),
      pitch,
    }

    const result = await writeClient.create({ _type: 'startup', ...startup })

    return parseServerActionResponse({ ...result, error: '', status: 'SUCCESS' })
  } catch (error) {
    return parseServerActionResponse({ error: JSON.stringify(error), status: 'ERROR' })
  }
}
