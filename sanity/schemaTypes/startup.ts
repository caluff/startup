import { defineField, defineType } from 'sanity'

export const startup = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.email().required().error('Please enter a valid email'),
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (Rule) => Rule.min(1).max(20).required().error('Please enter a category'),
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      validation: (Rule) =>
        Rule.min(10).max(15).required().error('Please enter a valid phone number'),
    }),
    defineField({
      name: 'website',
      type: 'url',
    }),
    defineField({
      name: 'poster',
      type: 'image',
      // 👇 Enables crop and hotspot tools
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
    }),
  ],
})
