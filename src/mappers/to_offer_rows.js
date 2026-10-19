import { isPlaceholder } from "./_utils.js";

function toRow(good, warehouse, kind, index) {
  if (!warehouse) {
    return {
      id: `${good.goodsID}:none`,
      name: good.name || "—",
      brand: good.brand || "—",
      number: good.number || "—",
      price: null,
      stock: good.count ?? 0,
      warehouse: "—",
      kind,
    };
  }

  return {
    id: `${good.goodsID}:${warehouse.id}:${index}`,
    name: good.name ?? "—",
    brand: good.brand ?? "—",
    number: good.number ?? "—",
    price: warehouse.price ?? null,
    stock: warehouse.stock ?? null,
    warehouse: warehouse.code ?? "—",
    kind,
  };
}

function appendGood(acc, good, kind) {
  const warehouses = Array.isArray(good.warehouses) ? good.warehouses : [];

  if (warehouses.length === 0) {
    acc.push(toRow(good, null, kind, 0));
    return;
  }

  warehouses.forEach((warehouse, index) => {
    acc.push(toRow(good, warehouse, kind, index));
  });
}

export function mapOffers(goods = []) {
  const acc = [];
  for (const good of goods) {
    if (isPlaceholder(good)) {
      continue;
    }
    appendGood(acc, good, "offer");
    for (const analog of good.analogues ?? []) {
      if (isPlaceholder(analog)) {
        continue;
      }
      appendGood(acc, analog, "analog");
    }
  }

  return acc;
}
