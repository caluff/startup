import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'
import { type WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  if (evt.type === 'user.created') {
    console.log('userId:', evt.data.id)

    const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_ID_QUERY, {
      id: evt.data.id,
    })

    if (!existingUser) {
      await writeClient.create({
        _type: 'author',
        id: evt.data.id,
        name: evt.data.first_name + ' ' + evt.data.last_name,
        username: evt.data.username,
        email: evt.data.email_addresses[0].email_address,
        image: evt.data.image_url,
      })
    }
  }

  return new Response('Webhook received', { status: 200 })
}
