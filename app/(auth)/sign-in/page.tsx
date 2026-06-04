import { signInAction } from '@/lib/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'next-view-transitions'

const errorMessages: Record<string, string> = {
  invalid: 'Invalid email or password.',
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const error = (await searchParams).error

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-3xl border border-gray-200 bg-background p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-950">Sign in</h1>
          <p className="mt-2 text-gray-600">Access your Sanity-backed author account.</p>
        </div>

        {error && (
          <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessages[error] ?? 'Unable to sign in.'}
          </p>
        )}

        <form action={signInAction} className="space-y-5">
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
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          No account?{' '}
          <Link href="/sign-up" className="font-semibold text-primary hover:underline">
            Create one
          </Link>
        </p>
      </section>
    </main>
  )
}
