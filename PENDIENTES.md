# PENDIENTES — Distrimercar O.R

Sitio demo de catálogo construido en `web-distrimercar/`. **No está listo para publicar**
hasta cerrar los bloqueantes de abajo.

## Bloqueantes de publicación

- [ ] **Precios reales.** Todos los precios de `src/datos/productos.json` son de demostración
  (`"origen": { "precio": "demo" }`). Reemplazar por la lista real del negocio.
- [ ] **Descripciones reales.** Igual que los precios: `origen.descripcion === "demo"` en los
  29 productos. Confirmar si el cliente quiere descripciones o solo el nombre.
- [ ] **Ciudad / barrio del local.** `src/datos/config.json` tiene `"ciudad": null` — no se
  inventó. Completar con el cliente (aparece en el encabezado y el pie).
- [ ] **Horario de atención.** `config.json → "horario": null`. Falta confirmarlo.
- [ ] **Correo y redes.** `config.json → "email"` y `"redes"` están vacíos. Si no tiene, se
  quedan vacíos; nunca inventar.
- [ ] **Foto del logo definitivo.** El logo actual viene de la imagen IA del cliente, recortada
  para quitar la marca "Made with AI". Si el cliente tiene el logo original en vector, usarlo.
- [ ] **WhatsApp confirmado.** Se usó el que aparece en la foto del local: 304 528 8312.
  Verificar que sea el número de pedidos (no personal del dueño).
- [ ] **Confirmar el derecho a usar las fotos de producto.** Vienen de un directorio interno
  del cliente; antes de publicar en dominio real hay que confirmar que se pueden usar.

## Pendientes técnicos (no bloquean la demo)

- [ ] Páginas legales (`/privacidad`, `/tratamiento-de-datos`) — aún no existen.
- [ ] Sitemap y robots — no generados.
- [ ] Imágenes de producto sin versión múltiple (galería con 2ª y 3ª foto cuando el cliente
  las tenga).
- [ ] Presentaciones en conflicto entre el `.docx` y la foto en: `MILO` (doc: 1500 g / foto:
  500 g), `FABULOSO` (doc: 180 ml / foto: 2 L), `AXIÓN LÍQUIDO` (doc: 360 ml / foto: 750 ml),
  `COLGATE` (doc: 75 ml / foto coincide), `ELITE ROLLAZO` (doc: 30 und / coincide).
  Se usó lo que muestra la foto. Revisar con el cliente.
- [ ] Productos del `.docx` que quedaron **sin foto de producto** (solo logo de marca):
  Doña Gallina 1500 g, La Lechera 90 g, Frutino, NutriBela, Ducales. No se publicaron como
  producto — cuando el cliente mande la foto, se agregan.
- [ ] Dos imágenes del docx eran grafismos de marca (Ariel y el de Café Águila), no producto:
  se usaron como logos, no como ficha.
- [ ] Catálogo ligero para el buscador se inyecta por página (`InyectarCatalogo.astro`);
  si el catálogo crece a cientos de productos, migrar al endpoint `datos/catalogo.json.js`.

## Cómo se ve el demo

```bash
npm install   # ya está con node_modules copiados
npm run dev
```
