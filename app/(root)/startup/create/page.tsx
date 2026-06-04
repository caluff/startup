import { StartupForm } from '@/components/StartupForm'
import { getCurrentAuthor } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Page = async () => {
  const author = await getCurrentAuthor()

  if (!author) {
    redirect('/sign-in')
  }

  return (
    <>
      <section className={'pink_container min-h-[230px]!'}>
        <h1 className={'heading'}>Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  )
}

export default Page
