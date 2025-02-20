import { useQueryState, useQueryStates } from 'nuqs'

export function useProductParams() {
  const [{ query, category }, setParams] = useQueryStates(
    {
      query: {
        defaultValue: '',
        parse: (value) => value || '',
      },
      category: {
        defaultValue: '',
        parse: (value) => value || '',
      },
    },
    {
      history: 'push',
      shallow: false,
    }
  )
  const setCategory = (newCategory: string) => {
    setParams({ category: newCategory })
  }

  const setQuery = (newQuery: string) => {
    setParams({ query: newQuery })
  }

  return {
    // other variables
    category,
    setCategory,
    query,
    setQuery,
  }
}
