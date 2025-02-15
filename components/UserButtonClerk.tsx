'use client'

import { UserButton } from '@clerk/nextjs'
import { useTransitionRouter } from 'next-view-transitions'

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

function UserButtonClerk() {
  const router = useTransitionRouter()

  const navigateToCreate = () => {
    router.push('/startup/create')
  }

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Create startup"
          labelIcon={<DotIcon />}
          onClick={navigateToCreate}
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserButtonClerk
