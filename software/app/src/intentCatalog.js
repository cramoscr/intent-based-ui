// Catálogo mínimo de intenciones reconocidas por IBUI.
export const intents = [
  { id: 'auth.ingresar', scope: 'universal', requiresAuth: false },
  { id: 'auth.salir', scope: 'universal', requiresAuth: true },
  { id: 'catalogo.productos', scope: 'universal', requiresAuth: false },
  { id: 'pedidos.crear', scope: 'admin', requiresAuth: true },
  { id: 'pedidos.consultar', scope: 'admin', requiresAuth: true },
];

// Los comandos de sesión se resuelven desde el mismo catálogo.
const normalize = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function resolveSessionIntent(text) {
  const value = normalize(text);
  if (['ingresar', 'ingresar al sistema', 'iniciar sesion', 'login'].includes(value)) return intents.find(item => item.id === 'auth.ingresar');
  if (['salir', 'cerrar sesion', 'desconectarme'].includes(value)) return intents.find(item => item.id === 'auth.salir');
  return null;
}
