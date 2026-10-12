# IBUI-001 — Publicación provisional

**Proyecto Firebase:** `fabricamelo-lab` (provisional). **Destino Hosting:** target `ibui` aislado. No usar el Hosting por defecto.

## Preparación inicial (una vez)

Desde `software/app`, tras autenticarse con Firebase CLI:

```bash
npm install
npm run build
firebase login
firebase projects:list
firebase hosting:sites:list --project fabricamelo-lab
```

Si no existe un sitio apropiado y está permitido crearlo, elegir un ID globalmente único (por ejemplo `fabricamelo-ibui-lab`, si está disponible):

```bash
firebase hosting:sites:create <SITE_ID> --project fabricamelo-lab
firebase target:apply hosting ibui <SITE_ID> --project fabricamelo-lab
```

**Importante:** `target: ibui` impide que un deploy de este directorio use accidentalmente el sitio Hosting por defecto. El comando `target:apply` modifica el archivo local `.firebaserc`: confirmar y versionar ese cambio.

## Deploy manual inicial

```bash
npm run build
firebase deploy --only hosting:ibui --project fabricamelo-lab
```

Verificar URL real entregada por Firebase. No se ha creado el sitio ni desplegado la aplicación todavía. Una vez validado el deploy manual, configurar GitHub Actions y credenciales limitadas para CI/CD. No guardar secretos en Git.

## Migración futura

Cambiar el proyecto de `.firebaserc`, crear nuevo sitio y aplicar nuevamente el target `ibui`. Mantener el código React sin cambios.
