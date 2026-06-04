import * as React from 'react'

export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const result = window.matchMedia(query)
      result.addEventListener('change', callback)

      return () => result.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = React.useCallback(() => window.matchMedia(query).matches, [query])

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
