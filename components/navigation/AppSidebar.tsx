import { Home, SquarePlus } from 'lucide-react'
import { Suspense } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { SidebarSearch } from '@/components/navigation/sidebar-query'
import { getCurrentAuthor } from '@/lib/auth'
import { signOutAction } from '@/lib/session-actions'
import { Button } from '@/components/ui/button'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Create startup',
    url: '/startup/create',
    icon: SquarePlus,
  },
]

export async function AppSidebar() {
  const author = await getCurrentAuthor()

  return (
    <Sidebar>
      <SidebarContent>
        <Suspense fallback={null}>
          <SidebarSearch />
        </Suspense>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.url === '/startup/create' && !author) {
                  return null
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="p-4">
        {author ? (
          <form action={signOutAction}>
            <Button type="submit" variant="outline" className="w-full">
              Sign out
            </Button>
          </form>
        ) : (
          <Button asChild className="w-full">
            <a href="/sign-in">Sign in</a>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
