import { useEffect, useState } from 'react'

const IDLE = { status: 'idle', items: [], error: null }

export function useAsyncRequest(queryKey, fetcher) {
  const [state, setState] = useState(IDLE)

  useEffect(() => {
    if (!queryKey) {
      setState((current) => (current.status === 'idle' ? current : IDLE))
      return undefined
    }

    const controller = new AbortController()
    setState({ status: 'loading', items: [], error: null })

    fetcher(controller.signal)
      .then((items) => {
        if (controller.signal.aborted) {
          return
        }
        setState({
          status: items.length === 0 ? 'empty' : 'success',
          items,
          error: null,
        })
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === 'AbortError') {
          return
        }
        setState({ status: 'error', items: [], error })
      })

    return () => controller.abort()
  }, [queryKey])

  return state
}
