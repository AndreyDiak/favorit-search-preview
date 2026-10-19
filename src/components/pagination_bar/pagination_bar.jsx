import styles from './pagination_bar.module.css'

export default function PaginationBar({ page, pageCount, from, to, total, onPage }) {
  if (pageCount <= 1) {
    return null
  }

  return (
    <div className={styles.bar}>
      <span>
        {from}–{to} из {total}
      </span>
      <div className={styles.controls}>
        <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Назад
        </button>
        <span>
          {page} / {pageCount}
        </span>
        <button type="button" disabled={page >= pageCount} onClick={() => onPage(page + 1)}>
          Дальше
        </button>
      </div>
    </div>
  )
}
