import { signUpAction } from '@/lib/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Link } from 'next-view-transitions'

const errorMessages: Record<string, string> = {
  exists: 'An author account already exists for that email.',
  invalid: 'Please check the fields and try again.',
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const error = (await searchParams).error

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-12">
      <section className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-background p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-950">Create author account</h1>
          <p className="mt-2 text-gray-600">
            Your account is stored as an author document in Sanity.
          </p>
        </div>

        {error && (
          <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessages[error] ?? 'Unable to create account.'}
          </p>
        )}

        <form action={signUpAction} className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-800">
              Name
            </label>
            <Input id="name" name="name" required autoComplete="name" />
          </div>

          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-semibold text-gray-800">
              Username
            </label>
            <Input id="username" name="username" autoComplete="username" />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-800">
              Email
            </label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-800">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="image" className="mb-2 block text-sm font-semibold text-gray-800">
              Profile image URL
            </label>
            <Input id="image" name="image" type="url" placeholder="Optional" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="bio" className="mb-2 block text-sm font-semibold text-gray-800">
              Bio
            </label>
            <Textarea id="bio" name="bio" maxLength={280} placeholder="Optional" />
          </div>

          <Button type="submit" className="md:col-span-2">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  )
}
