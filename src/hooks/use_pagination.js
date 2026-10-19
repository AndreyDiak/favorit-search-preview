import { useState } from 'react'

export function usePagination(items, pageSize = 10) {
  const signature = `${items.length}:${items[0]?.id ?? ''}:${items.at(-1)?.id ?? ''}`
  const [state, setState] = useState({ signature, page: 1 })

  if (state.signature !== signature) {
    setState({ signature, page: 1 })
  }

  const page = state.signature === signature ? state.page : 1
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * pageSize

  return {
    page: current,
    pageCount,
    pageItems: items.slice(start, start + pageSize),
    total: items.length,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, items.length),
    setPage(next) {
      setState({ signature, page: next })
    },
  }
}
