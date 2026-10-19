const API_URL = 'http://api.favorit-parts.ru/hs/hsprice/'

const ERROR_TEXT = {
  'Empty key!': 'Не указан ключ покупателя',
  'Invalid key client!': 'Неверный ключ покупателя',
  'Empty number goods!': 'Не указан номер детали',
  'Request quota exceeded!': 'Превышен лимит запросов',
}

function translateError(error) {
  const raw = Array.isArray(error) ? error.join('; ') : String(error ?? '')
  return ERROR_TEXT[raw] || raw || 'Сервис вернул ошибку'
}

export async function fetchGoods(params, signal) {
  const url = new URL(API_URL)
  const key = import.meta.env.VITE_FAVORIT_API_KEY

  if (key) {
    url.searchParams.set('key', key)
  }

  Object.entries(params).forEach(([name, value]) => {
    if (value != null && value !== '') {
      url.searchParams.set(name, value)
    }
  })

  let response
  try {
    response = await fetch(url, {
      signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw error
    }
    throw new Error('Не удалось связаться с сервисом')
  }

  let body
  try {
    body = await response.json()
  } catch {
    throw new Error('Сервис вернул непонятный ответ')
  }

  if (!response.ok || body?.error) {
    throw new Error(
      body?.error
        ? translateError(body.error)
        : `Ошибка сервиса (${response.status})`,
    )
  }

  return Array.isArray(body?.goods) ? body.goods : []
}
