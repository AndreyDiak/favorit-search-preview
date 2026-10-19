import styles from './search_field.module.css'

export default function SearchField({ value, onChange, pending }) {
  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label className={styles.label} htmlFor="article">
        Артикул
      </label>
      <input
        id="article"
        className={styles.input}
        value={value}
        placeholder="Например, 01089"
        autoComplete="off"
        spellCheck="false"
        onChange={(event) => onChange(event.target.value)}
      />
      <p className={styles.hint}>
        {pending
          ? 'Подождите, запрос уйдёт после паузы в вводе'
          : 'Минимум 3 символа. Производители появятся автоматически'}
      </p>
    </form>
  )
}
