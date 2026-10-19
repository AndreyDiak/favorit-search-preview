import { usePagination } from '../../hooks/use_pagination.js'
import PaginationBar from '../pagination_bar/pagination_bar.jsx'
import StatusMessage from '../status_message/status_message.jsx'
import styles from './offers_table.module.css'

const priceFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
})

function formatPrice(value) {
  if (value == null) {
    return '—'
  }

  return priceFormat.format(value)
}

export default function OffersTable({ items, status, error, onRetry }) {
  const pagination = usePagination(items, 10)

  if (status === 'loading' || status === 'idle') {
    return <StatusMessage tone="loading" title="Загружаем аналоги и предложения" />
  }

  if (status === 'error') {
    return (
      <StatusMessage
        tone="error"
        title="Не удалось получить предложения"
        text={error?.message}
        action={
          <button type="button" className={styles.retry} onClick={onRetry}>
            Повторить
          </button>
        }
      />
    )
  }

  if (status === 'empty') {
    return (
      <StatusMessage
        tone="empty"
        title="Предложений нет"
        text="Сервис не вернул ни аналогов, ни складских позиций."
      />
    )
  }

  if (status !== 'success') {
    return null
  }

  return (
    <div className={styles.layout}>
      <div className={styles.wrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название / производитель</th>
              <th>Склад</th>
              <th>Цена</th>
              <th>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {pagination.pageItems.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className={styles.name}>{row.name}</div>
                  <div className={styles.sub}>
                    <span className={row.kind === 'analog' ? styles.analog : styles.offer}>
                      {row.kind === 'analog' ? 'Аналог' : 'Запрошенная'}
                    </span>
                    {row.brand} · {row.number}
                  </div>
                </td>
                <td>{row.warehouse}</td>
                <td className={styles.price}>{formatPrice(row.price)}</td>
                <td>{row.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationBar
        page={pagination.page}
        pageCount={pagination.pageCount}
        from={pagination.from}
        to={pagination.to}
        total={pagination.total}
        onPage={pagination.setPage}
      />
    </div>
  )
}
