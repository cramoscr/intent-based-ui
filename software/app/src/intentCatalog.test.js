import test from 'node:test';
import assert from 'node:assert/strict';
import { intents, resolveSessionIntent } from './intentCatalog.js';

test('each intent has a unique id and explicit access metadata', () => {
  assert.equal(new Set(intents.map(intent => intent.id)).size, intents.length);
  for (const intent of intents) {
    assert.ok(intent.id);
    assert.ok(['universal', 'admin'].includes(intent.scope));
    assert.equal(typeof intent.requiresAuth, 'boolean');
  }
});

test('login expressions are accent- and case-insensitive', () => {
  for (const expression of ['Ingresar', 'INGRESAR AL SISTEMA', 'Iniciar sesión', 'login']) {
    assert.equal(resolveSessionIntent(expression)?.id, 'auth.ingresar');
  }
});

test('logout expressions are recognized', () => {
  for (const expression of ['Salir', 'Cerrar sesión', 'desconectarme']) {
    assert.equal(resolveSessionIntent(expression)?.id, 'auth.salir');
  }
});

test('unrelated commands do not resolve as session intents', () => {
  for (const expression of ['crear pedido', 'pedidos de Marvin', 'catalogo', '']) {
    assert.equal(resolveSessionIntent(expression), null);
  }
});
