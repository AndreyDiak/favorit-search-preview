import { useState } from 'react'
import { fetchGoods } from '../api/price_api.js'
import { mapOffers } from '../mappers/to_offer_rows.js'
import { useAsyncRequest } from './use_async_request.js'

export function useOfferSearch(brand) {
  const [attempt, setAttempt] = useState(0)
  const queryKey = brand ? `${brand.number}::${brand.brand}::${attempt}` : ''

  const request = useAsyncRequest(queryKey, (signal) =>
    fetchGoods(
      { number: brand.number, brand: brand.brand, analogues: 'on' },
      signal,
    ).then(mapOffers),
  )

  return {
    ...request,
    loading: request.status === 'loading',
    empty: request.status === 'empty',
    retry() {
      setAttempt((value) => value + 1)
    },
  }
}
