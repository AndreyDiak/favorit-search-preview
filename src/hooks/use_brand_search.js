import { useState } from 'react'
import { fetchGoods } from '../api/price_api.js'
import { toBrands } from '../mappers/to_brands.js'
import { useAsyncRequest } from './use_async_request.js'
import { useDebouncedValue } from './use_debounced_value.js'

const MIN_LENGTH = 3
const DEBOUNCE_MS = 300

function createKey(value, attempt) {
  if (value.length < MIN_LENGTH) {
    return ''
  }

  return `${value}::${attempt}`
}

export function useBrandSearch(input) {
  const normalized = input.trim()
  const debounced = useDebouncedValue(normalized, DEBOUNCE_MS)
  const [attempt, setAttempt] = useState(0)
  const pending = normalized !== debounced
  const queryKey = createKey(debounced, attempt)

  const request = useAsyncRequest(queryKey, (signal) =>
    fetchGoods({ number: debounced }, signal).then(toBrands),
  )

  return {
    ...request,
    debounced,
    pending: pending && normalized.length >= MIN_LENGTH,
    tooShort: normalized.length > 0 && normalized.length < MIN_LENGTH,
    loading: request.status === 'loading',
    empty: request.status === 'empty',
    retry() {
      setAttempt((value) => value + 1)
    },
  }
}
