import { SidebarGroup, SidebarGroupContent, SidebarHeader } from '@/components/ui/sidebar'
import { FiltersModal } from '../queries/filters-module'
import SearchModule from '../queries/search-module'

export function SidebarSearch() {
  return (
    <SidebarHeader>
      <SidebarGroup>
        <SidebarGroupContent>
          <div>
            <SearchModule />
          </div>

          <div className="mt-2">
            <FiltersModal />
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarHeader>
  )
}
