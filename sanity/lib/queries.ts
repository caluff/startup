import { defineQuery } from 'groq'

// Author Queries
export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  }
  `)

// Startup Queries
export const STARTUP_QUERY =
  defineQuery(`*[_type=="startup" && defined(slug.current) && (!defined($search) || (title match $search && (!defined($category) || category == $category))) && (!defined($category) || category == $category)] | order(_createdAt desc){
  _id,
    title,
    slug,
    _createdAt,
    author->{
      _id, id, name, slug, image, bio
    },
      "poster": poster.asset->url,
    views,
    description,
    category,
    email,
    website,
    phone,
    image,
}`)

export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type=="startup" && _id==$id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id, id, name, image, bio, username
  },
  "poster": poster.asset->url,
  views,
  description,
  category,
  email,
  phone,
  website,
  image,
  pitch,
}`)

export const STARTUP_BY_AUTH_QUERY =
  defineQuery(`*[_type=="startup" && author._ref == $id] | order(_createdAt desc){
  _id,
    title,
    slug,
    _createdAt,
    author->{
      _id, id, name, slug, image, bio
    },
      "poster": poster.asset->url,
    views,
    description,
    category,
    email,
    website,
    phone,
    image,
}`)

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type =="startup" && _id==$id][0]{
  _id, views
  }`)

// Playlist Queries
export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      id, 
      name,
      slug,
      image,
      bio
    },
      "poster": poster.asset->url,
    views,
    description,
    category,
    image,
    pitch
  }
}`)
