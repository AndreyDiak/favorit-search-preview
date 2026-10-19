import { useState } from 'react'
import BrandList from '../brand_list/brand_list.jsx'
import OffersTable from '../offers_table/offers_table.jsx'
import SearchField from '../search_field/search_field.jsx'
import { useBrandSearch } from '../../hooks/use_brand_search.js'
import { useOfferSearch } from '../../hooks/use_offer_search.js'
import styles from './app.module.css'

export default function App() {
  const [article, setArticle] = useState('')
  const [selected, setSelected] = useState(null)
  const brands = useBrandSearch(article)
  const offers = useOfferSearch(selected)

  function onArticleChange(value) {
    setArticle(value)
    setSelected(null)
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Проценка</p>
        <h1>Поиск запчастей</h1>
        <p className={styles.lead}>
          Введите артикул, выберите производителя и посмотрите предложения вместе с аналогами.
        </p>
      </header>

      <section className={styles.card}>
        <SearchField value={article} onChange={onArticleChange} pending={brands.pending} />
      </section>

      <div className={styles.columns}>
        <section className={`${styles.card} ${styles.panel}`}>
          <h2>Производители</h2>
          <div className={styles.scroll}>
            <BrandList
              items={brands.items}
              status={brands.status}
              pending={brands.pending}
              tooShort={brands.tooShort}
              error={brands.error}
              selectedId={selected?.id}
              onSelect={setSelected}
              onRetry={brands.retry}
            />
          </div>
        </section>

        <section className={`${styles.card} ${styles.panel}`}>
          <h2>Аналоги и предложения</h2>
          <div className={styles.scroll}>
            {selected ? (
              <div className={styles.results}>
                <p className={styles.picked}>
                  {selected.brand} · {selected.name || selected.number}
                </p>
                <OffersTable
                  items={offers.items}
                  status={offers.status}
                  error={offers.error}
                  onRetry={offers.retry}
                />
              </div>
            ) : (
              <p className={styles.placeholder}>
                Выберите производителя, чтобы загрузить цены и остатки.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
