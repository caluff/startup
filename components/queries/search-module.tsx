'use client'
import { Search, X } from 'lucide-react'
import { useProductParams } from '@/hooks/useProductParams'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function SearchModule() {
  const { query, setQuery } = useProductParams()

  const handleQueryChange = (value: string) => {
    setQuery(value)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          name="query"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search startups..."
          className="bg-background pl-9 pr-20"
        />

        {query && (
          <>
            <Button
              type="button"
              onClick={() => {
                setQuery('')
              }}
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7 hover:bg-muted cursor-pointer"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchModule
