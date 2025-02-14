import { StartupForm } from '@/components/StartupForm'
import { useCurrentUser } from 'sanity'
import { redirect } from 'next/navigation'

const Page = async () => {
  // const clerkUser = await useCurrentUser()

  // if (!clerkUser) redirect('/')

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
