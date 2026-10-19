import PaginationBar from '../pagination_bar/pagination_bar.jsx'
import StatusMessage from '../status_message/status_message.jsx'
import { usePagination } from '../../hooks/use_pagination.js'
import styles from './brand_list.module.css'

export default function BrandList({
  items,
  status,
  pending,
  tooShort,
  error,
  selectedId,
  onSelect,
  onRetry,
}) {
  const pagination = usePagination(items, 8)

  if (tooShort) {
    return (
      <StatusMessage
        tone="idle"
        title="Слишком короткий артикул"
        text="Введите ещё хотя бы несколько символов."
      />
    )
  }

  if (pending) {
    return (
      <StatusMessage
        tone="loading"
        title="Ожидание ввода"
        text="Запрос отправится, когда артикул перестанет меняться."
      />
    )
  }

  if (status === 'idle') {
    return (
      <StatusMessage
        tone="idle"
        title="Начните с артикула"
        text="Список производителей появится здесь."
      />
    )
  }

  if (status === 'loading') {
    return <StatusMessage tone="loading" title="Ищем производителей" />
  }

  if (status === 'error') {
    return (
      <StatusMessage
        tone="error"
        title="Не удалось получить производителей"
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
        title="Ничего не найдено"
        text="По этому артикулу производители не нашлись."
      />
    )
  }

  return (
    <div className={styles.layout}>
      <div className={styles.listScroll}>
      <ul className={styles.list}>
        {pagination.pageItems.map((item) => {
          const selected = item.id === selectedId
          return (
            <li key={item.id}>
              <button
                type="button"
                className={selected ? styles.selected : styles.brand}
                aria-pressed={selected}
                onClick={() => onSelect(item)}
              >
                <span className={styles.brandName}>{item.brand}</span>
                <span className={styles.partName}>{item.name || 'Без названия'}</span>
                <span className={styles.meta}>
                  {item.number} · остаток {item.count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
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
