// IBUI-005: deterministic extraction; no persistence or access-control decisions here.
export const normalizeIntent = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

const numbers = { un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10 };

export function parseCompleteOrderIntent(input) {
  const q = normalizeIntent(input);
  const match = /^(?:crea|crear|haz|hacer|genera|generar|registra|registrar|agrega|agregar)\s+(?:un\s+)?pedido\s+(?:para|a|de)\s+(.+?)\s+(?:con|por)\s+(.+)$/.exec(q);
  if (!match) return null;
  const customer = match[1].trim();
  let product = match[2].trim();
  const quantityMatch = /^(\d+|un|uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s+(?=\S)/.exec(product);
  let quantity = 1;
  if (quantityMatch) {
    quantity = numbers[quantityMatch[1]] ?? Number(quantityMatch[1]);
    product = product.slice(quantityMatch[0].length).trim();
  }
  if (!customer || !product) return null;
  return { customer, product, quantity, validQuantity: Number.isInteger(quantity) && quantity >= 1 && quantity <= 9999 };
}

export function resolveProductMention(products, mention) {
  const normalized = normalizeIntent(mention).replace(/\b(cirios?|velas?|de|del|un|una)\b/g, ' ').replace(/\s+/g, ' ').trim();
  const dims = /\b(\d+)\s*[x×]\s*(\d+)\b/.exec(normalized);
  const matches = (products || []).filter(p => {
    const name = normalizeIntent(p.name);
    if (dims) {
      const candidate = /\b(\d+)\s*[x×]\s*(\d+)\b/.exec(name);
      if (!candidate || candidate[1] !== dims[1] || candidate[2] !== dims[2]) return false;
      const rest = normalized.replace(dims[0], '').trim();
      return !rest || rest.split(' ').every(term => name.includes(term));
    }
    return normalized && normalized.split(' ').every(term => name.includes(term));
  });
  return matches;
}
