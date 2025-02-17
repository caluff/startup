import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .refine(async (url) => {
      if (!url) return true

      try {
        const res = await fetch(url, { method: 'HEAD' })
        const contentType = res.headers.get('content-type')
        return contentType?.startsWith('image/')
      } catch {
        return false
      }
    })
    .optional(),
  poster: z.any().optional(),
  pitch: z.string().min(10),
  phone: z.string().optional(),
  website: z.string().optional(),
  email: z.string().email(),
})
