# Distrimercar O.R — tienda online (demo)

Catálogo con pedido por WhatsApp para **Distrimercar O.R**, distribuidora de abarrotes y
aseo. Construido con Astro + Tailwind (patrón de catálogo del sistema constructor).

**Estado: demo.** Los precios y las descripciones son de ejemplo y están marcados como tales
en los datos (`origen.precio === "demo"`). Ver `PENDIENTES.md` antes de publicar.

## Arrancar

```bash
npm install
npm run dev      # vista previa local
npm run build    # compila a dist/
npm run preview  # sirve dist/
```

## Qué hay

- **29 productos** extraídos del directorio `.docx` del cliente, con sus fotos oficiales.
- **5 categorías:** desayunos, abarrotes, galletas, limpieza y cuidado personal.
- Portada con destacados y ofertas, **buscador** (ignora tildes y errores comunes),
  ficha de producto por URL, y **carrito con pedido por WhatsApp** (sin pago en línea).
- Sección de **marcas** con los logos aliados que entregó el cliente.

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Precios, descripciones, stock, destacados | `src/datos/productos.json` |
| Categorías del menú | `src/datos/categorias.json` |
| WhatsApp, dirección, textos del encabezado | `src/datos/config.json` |
| Formas de pago (y el selector del carrito) | `src/datos/config.json → formas_pago` |
| Textos de la portada | `src/datos/home.json` |
| Sinónimos del buscador | `src/datos/sinonimos.json` |
| Fotos de producto | `public/img/productos/` (mismo nombre que el slug) |
| Logos de marca | `public/img/marcas/` |
| Logo y foto del local | `public/img/sitio/` |

Regla de oro: **el precio siempre es número entero** (`12900`, no `"$12.900"`). El formato se
aplica al mostrar. Un precio en texto rompe el carrito y los filtros.

## URLs

- `/` portada · `/catalogo` todo · `/ofertas` descuentos
- `/categoria/[slug]` por categoría · `/producto/[slug]` ficha de cada producto

Todo es estático: `npm run build` genera 37 páginas en `dist/`.
