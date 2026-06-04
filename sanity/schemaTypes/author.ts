import { defineField, defineType } from 'sanity'
import { UserIcon } from 'lucide-react'
import type { ComponentType } from 'react'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon as ComponentType,
  fields: [
    defineField({
      name: 'id',
      type: 'string',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'passwordHash',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
