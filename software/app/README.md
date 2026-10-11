# IBUI-001 — First Mobile Experience

Prototipo independiente en React 18 + Material UI 5, conforme al ADR-0001.

## Ejecutar localmente

```bash
cd software/app
npm install
npm run dev
```

## Compilar

```bash
npm run build
```

## Firebase Hosting

El archivo `firebase.json` apunta a `dist/`. **No hay proyecto Firebase configurado ni despliegue realizado.** Una vez definido un proyecto aislado y autenticado Firebase CLI, ejecutar `firebase deploy --only hosting --project <PROJECT_ID>` desde `software/app`.

## Alcance

Solo entrada de intención y dos burbujas animadas; sin backend, voz, navegación, pedidos ni PWA instalable todavía. La reducción de movimiento se respeta. No desplegar sobre el proyecto productivo de Cirios-App.
