import 'server-only'

import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import { cookies } from 'next/headers'
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const SESSION_COOKIE = 'startup_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

type SessionPayload = {
  authorId: string
  exp: number
}

const getAuthSecret = () => {
  const secret = process.env.AUTH_SECRET

  if (!secret) {
    throw new Error('Missing environment variable: AUTH_SECRET')
  }

  return secret
}

const toBase64Url = (value: Buffer | string) => Buffer.from(value).toString('base64url')

const fromBase64Url = (value: string) => Buffer.from(value, 'base64url').toString('utf8')

const sign = (value: string) => createHmac('sha256', getAuthSecret()).update(value).digest('base64url')

const hashPasswordWithSalt = (password: string, salt: string) =>
  scryptSync(password, salt, 64).toString('base64url')

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('base64url')
  const hash = hashPasswordWithSalt(password, salt)

  return `scrypt:${salt}:${hash}`
}

export const verifyPassword = (password: string, storedHash?: string | null) => {
  if (!storedHash) return false

  const [algorithm, salt, hash] = storedHash.split(':')
  if (algorithm !== 'scrypt' || !salt || !hash) return false

  const candidate = hashPasswordWithSalt(password, salt)
  const stored = Buffer.from(hash)
  const candidateBuffer = Buffer.from(candidate)

  if (stored.length !== candidateBuffer.length) return false

  return timingSafeEqual(stored, candidateBuffer)
}

export const createSession = async (authorId: string) => {
  const payload: SessionPayload = {
    authorId,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const encodedPayload = toBase64Url(JSON.stringify(payload))
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, `${encodedPayload}.${sign(encodedPayload)}`, {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

export const clearSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export const getSession = async () => {
  const cookieStore = await cookies()
  const value = cookieStore.get(SESSION_COOKIE)?.value
  if (!value) return null

  const [encodedPayload, signature] = value.split('.')
  if (!encodedPayload || !signature || sign(encodedPayload) !== signature) return null

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload
    if (!payload.authorId || payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload
  } catch {
    return null
  }
}

export const getCurrentAuthor = async () => {
  const session = await getSession()
  if (!session) return null

  return client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_ID_QUERY, {
    id: session.authorId,
  })
}
