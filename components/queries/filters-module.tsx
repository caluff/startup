'use client'

import { Filter, X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useProductParams } from '@/hooks/useProductParams'
import { cn } from '@/lib/utils'

export function FiltersModal() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { category } = useProductParams()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex cursor-pointer items-center gap-2 rounded-sm hover:bg-gray-100 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters {category && `*`}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Startups</DialogTitle>
            <DialogDescription>Refine your startup search with these filters.</DialogDescription>
          </DialogHeader>
          <FilterForm />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="flex cursor-pointer items-center gap-2 rounded-sm hover:bg-gray-100 transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filters {category && `*`}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Filter Startups</DrawerTitle>
          <DrawerDescription>Refine your startup search with these filters.</DrawerDescription>
        </DrawerHeader>
        <FilterForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function FilterForm({ className }: React.ComponentProps<'div'>) {
  const { category, setCategory } = useProductParams()

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const categories = [
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Tech', value: 'Tech' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Education', value: 'Education' },
    { label: 'Retail', value: 'Retail' },
  ]

  return (
    <div className={cn('grid items-start gap-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <div className="flex gap-2">
          <Select
            name="category"
            defaultValue={category ?? ''}
            value={category}
            onValueChange={(value) => handleCategoryChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {category && (
            <Button
              type="button"
              onClick={() => {
                setCategory('')
              }}
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear category</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
