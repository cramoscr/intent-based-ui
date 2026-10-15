// Catálogo mínimo de intenciones reconocidas por IBUI.
export const intents = [
  { id: 'auth.ingresar', scope: 'universal', requiresAuth: false },
  { id: 'auth.salir', scope: 'universal', requiresAuth: true },
  { id: 'catalogo.productos', scope: 'universal', requiresAuth: false },
  { id: 'pedidos.crear', scope: 'admin', requiresAuth: true },
  { id: 'pedidos.consultar', scope: 'admin', requiresAuth: true },
];
