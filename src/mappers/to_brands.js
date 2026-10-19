import { isPlaceholder } from './_utils.js'

export function toBrands(goods) {
  return goods.filter((good) => !isPlaceholder(good)).map((good) => ({
    id: good.goodsID,
    brand: good.brand,
    name: good.name,
    number: good.number,
    count: good.count ?? 0,
  }))
}
