import { Home, SquarePlus } from 'lucide-react'

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
import { auth } from '@clerk/nextjs/server'
import UserButtonClerk from '../UserButtonClerk'

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
    needsAuth: true,
  },
]

export async function AppSidebar() {
  const { userId } = await auth()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarSearch />

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.needsAuth && !userId) {
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

      <SidebarFooter>
        <UserButtonClerk />
      </SidebarFooter>
    </Sidebar>
  )
}
