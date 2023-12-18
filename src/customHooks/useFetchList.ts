import { useEffect } from 'react'

export const useFetchList = (currentList: unknown[], fetchList: () => void) =>
  useEffect(() => {
    if (Object.keys(currentList).length === 0) fetchList()
  }, [])
