import styles from './status_message.module.css'

export default function StatusMessage({ tone, title, text, action }) {
  return (
    <div
      className={[styles.message, styles[tone]].filter(Boolean).join(' ')}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {tone === 'loading' && <span className={styles.spinner} aria-hidden="true" />}
      <div className={styles.body}>
        <strong>{title}</strong>
        {text && <p>{text}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  )
}
