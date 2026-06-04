'use server'

import { clearSession, createSession, hashPassword, verifyPassword } from '@/lib/auth'
import { client } from '@/sanity/lib/client'
import { AUTHOR_AUTH_BY_EMAIL_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(8),
  username: z.string().trim().max(40).optional(),
  image: z.string().trim().url().optional().or(z.literal('')),
  bio: z.string().trim().max(280).optional(),
})

const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
})

const getUsername = (email: string, username?: string) =>
  (username?.trim() || email.split('@')[0] || '').replace(/\s+/g, '').toLowerCase()

export async function signUpAction(formData: FormData) {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    redirect('/sign-up?error=invalid')
  }

  const email = parsed.data.email.toLowerCase()
  const existingAuthor = await client.withConfig({ useCdn: false }).fetch(AUTHOR_AUTH_BY_EMAIL_QUERY, {
    email,
  })

  if (existingAuthor?.passwordHash) {
    redirect('/sign-up?error=exists')
  }

  const authorFields = {
    name: parsed.data.name,
    username: getUsername(email, parsed.data.username),
    email,
    image: parsed.data.image || '',
    bio: parsed.data.bio || '',
    passwordHash: hashPassword(parsed.data.password),
  }

  const author = existingAuthor?._id
    ? await writeClient.patch(existingAuthor._id).set(authorFields).commit()
    : await writeClient.create({
        _type: 'author',
        ...authorFields,
      })

  await createSession(author._id)
  redirect('/startup/create')
}

export async function signInAction(formData: FormData) {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    redirect('/sign-in?error=invalid')
  }

  const email = parsed.data.email.toLowerCase()
  const author = await client.withConfig({ useCdn: false }).fetch(AUTHOR_AUTH_BY_EMAIL_QUERY, {
    email,
  })

  if (!author?._id || !verifyPassword(parsed.data.password, author.passwordHash)) {
    redirect('/sign-in?error=invalid')
  }

  await createSession(author._id)
  redirect('/startup/create')
}

export async function signOutAction() {
  await clearSession()
  redirect('/')
}
