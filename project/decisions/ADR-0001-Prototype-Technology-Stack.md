# ADR-0001 — Stack tecnológico del primer prototipo

- **Estado:** Aceptado
- **Fecha:** 2026-10-11
- **Proyecto:** Intent-Based-UI (IBUI)
- **Ámbito:** Primer prototipo IBUI-001, no arquitectura universal

## Contexto

Intent-Based-UI es un experimento de interfaz basada en intenciones, independiente de Cirios-App y Fabrícamelo. El primer alcance consiste en una pantalla monocromática con dos burbujas de intención, «Ver catálogo de productos» y «Crear pedido», con aparición animada. El objetivo inmediato es evaluar la experiencia en un móvil Android.

Se había preparado un prototipo en HTML/CSS/JavaScript puro y una PWA para GitHub Pages. Esa dirección no fue acordada como base tecnológica y se apartó innecesariamente del stack ya utilizado en Cirios-App.

Se verificó en `cramoscr/cirios-app` que su `package.json` utiliza React 18, Material UI 5, Emotion, React Router 6 y react-scripts 5; `firebase.json` configura Firebase Hosting sobre `build/`.

## Decisión

1. Implementar el primer prototipo de IBUI usando **React y Material UI (MUI)**, manteniendo continuidad visual y técnica con Cirios-App.
2. Usar **Firebase Hosting** para la publicación y prueba móvil, en lugar de GitHub Pages.
3. Mantener **repositorio independiente**: `cramoscr/intent-based-ui`. Cirios-App es referencia técnica y piloto conceptual, no destino del código experimental.
4. Usar un **proyecto o sitio Firebase aislado** de la aplicación productiva, por determinar durante la configuración. No modificar producción.
5. Preparar un flujo de **build y despliegue desde GitHub Actions** después de verificar el destino, credenciales y permisos de Firebase.
6. Mantener inicialmente solo los dos intents aprobados y su animación de entrada; la selección puede ser simulada. No integrar APIs, Firestore ni escritura de pedidos en esta fase.
7. Conservar la opción de hacer la experiencia instalable como PWA; esto requiere manifest, iconos, service worker y verificación real en Android. Firebase Hosting no implica por sí solo instalación.
8. Reutilizar patrones de Cirios-App sin copiar automáticamente su configuración completa, secretos ni dependencias no necesarias.

## Consecuencias

### Positivas
- Menor curva de aprendizaje y reutilización de conocimientos, herramientas y patrones existentes.
- Consistencia visual con Cirios-App.
- Despliegue alineado con el ecosistema Firebase ya conocido.
- Separación del experimento respecto de la operación productiva.

### Costos y compromisos
- Configuración inicial de proyecto/sitio Firebase y CI/CD.
- Dependencias React/MUI y proceso de build frente a HTML estático.
- La instalación en Android deberá validarse aparte.

## Alternativas consideradas

- **HTML/CSS/JavaScript puro + GitHub Pages:** técnicamente viable para un demo, pero descartado como ruta principal por apartarse de la base elegida.
- **Flutter/APK nativo:** pospuesto; no se justifica para validar las primeras interacciones.
- **Modificar directamente Cirios-App:** descartado para preservar aislamiento de FAB-011 y producción.

## Próximos pasos

1. Cerrar sin fusionar el PR experimental #1 de HTML/PWA.
2. Crear una implementación React + MUI en el repositorio IBUI, manteniendo la referencia visual monocromática aprobada.
3. Configurar un destino Firebase Hosting aislado.
4. Preparar CI/CD y probar el despliegue.
5. Validar experiencia en Android; decidir entonces si se necesita PWA instalable o empaquetado adicional.

## Referencias

- [Visión de IBUI](../../specifications/VISION.md)
- [Cirios-App](https://github.com/cramoscr/cirios-app)
- [PR experimental #1](https://github.com/cramoscr/intent-based-ui/pull/1)
