import { SignInButton } from '@clerk/nextjs'
import { DoorOpen } from 'lucide-react'
import { Button } from '../ui/button'

export default function CustomSignInButton() {
  return (
    <SignInButton>
      <Button
        variant="outline"
        className="flex items-center gap-2 border-2 border-primary/20 cursor-pointer hover:border-primary/40 hover:bg-primary/5 text-primary transition-all duration-300"
      >
        <DoorOpen className="h-4 w-4" />
        <span className="font-medium">Log in</span>
      </Button>
    </SignInButton>
  )
}
