import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCompleteOrderIntent, resolveProductMention } from './orderIntent.js';

test('extracts complete order and implicit quantity', () => {
  assert.deepEqual(parseCompleteOrderIntent('Crea un pedido para Marvin con un cirio de 10 x 80'), {
    customer: 'marvin', product: 'cirio de 10 x 80', quantity: 1, validQuantity: true,
  });
});
test('extracts word quantity without confusing dimensions', () => {
  assert.equal(parseCompleteOrderIntent('Crea pedido para Marvin con dos cirios 10×80').quantity, 2);
});
test('rejects invalid quantities', () => {
  assert.equal(parseCompleteOrderIntent('Crear pedido para Marvin con 0 cirios 10 x 80').validQuantity, false);
});
test('does not capture incomplete orders', () => {
  assert.equal(parseCompleteOrderIntent('Crear pedido'), null);
});
test('matches dimensions precisely and preserves ambiguity', () => {
  const products = [{name:'Cirio pascual 10 x 80'}, {name:'Cirio blanco 10 × 80'}, {name:'Cirio 10 x 60'}];
  assert.equal(resolveProductMention(products, 'cirio 10 x 80').length, 2);
});
