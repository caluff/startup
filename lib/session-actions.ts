'use server'

import { clearSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function signOutAction() {
  await clearSession()
  redirect('/')
}
