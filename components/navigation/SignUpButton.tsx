import { SignUpButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { UserPlus } from 'lucide-react'

export default function CustomSignUpButton() {
  return (
    <SignUpButton>
      <Button className="flex cursor-pointer items-center gap-2 bg-primary hover:bg-primary/90 text-white transition-all duration-300">
        <UserPlus className="h-4 w-4" />
        <span className="font-medium">Sign up</span>
      </Button>
    </SignUpButton>
  )
}
