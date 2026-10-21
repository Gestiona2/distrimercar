import { pesos } from './formato.js';
import { construirIndice, buscar } from './busqueda.js';
import { montarCarrito } from './carrito.js';
import { agregar } from './pedido.js';

window.addEventListener('DOMContentLoaded', () => {
  const config = window.__DM_CONFIG__ || {};
  const productos = window.__DM_PRODUCTOS__ || [];
  const sinonimos = window.__DM_SINONIMOS__ || {};

  const B = window.__DM_BASE__ || '';

  montarCarrito(config);

  const indice = construirIndice(productos);
  const porSlug = new Map(productos.map((p) => [p.slug, p]));

  const input = document.getElementById('buscador-input');
  const resultados = document.getElementById('buscador-resultados');

  function pintarResultados(slugs) {
    if (!resultados) return;
    if (!input?.value.trim()) {
      resultados.classList.add('hidden');
      resultados.innerHTML = '';
      return;
    }
    resultados.classList.remove('hidden');
    if (slugs.length === 0) {
      resultados.innerHTML = `<p class="p-4 text-sm text-tinta-suave">Sin resultados. Prueba con otra palabra, por ejemplo “milo”, “café” o “detergente”.</p>`;
      return;
    }
    resultados.innerHTML = slugs
      .slice(0, 8)
      .map((slug) => {
        const p = porSlug.get(slug);
        if (!p) return '';
        return `<a href="${B}/producto/${p.slug}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-verde-claro">
          <img src="${B}/img/productos/${p.imagen}" alt="" class="h-10 w-10 rounded-lg bg-white object-contain" loading="lazy" />
          <span class="min-w-0 flex-1">
            <span class="block clamp-2 text-sm font-bold leading-tight">${p.titulo}</span>
            <span class="block text-xs text-tinta-suave">${p.marca}</span>
          </span>
          <span class="text-sm font-extrabold text-verde">${pesos(p.precio)}</span>
        </a>`;
      })
      .join('');
  }

  input?.addEventListener('input', () => {
    pintarResultados(buscar(indice, input.value, sinonimos));
  });
  input?.addEventListener('focus', () => {
    if (input.value.trim()) pintarResultados(buscar(indice, input.value, sinonimos));
  });
  document.addEventListener('click', (e) => {
    const cont = document.getElementById('buscador');
    if (cont && !cont.contains(e.target)) resultados?.classList.add('hidden');
  });

  document.querySelectorAll('[data-agregar]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = btn.getAttribute('data-agregar');
      const p = porSlug.get(slug);
      if (!p) return;
      agregar({
        slug: p.slug,
        titulo: p.titulo,
        precio: p.precio,
        imagen: p.imagen,
      });
      btn.textContent = '✓ Agregado';
      btn.classList.add('bg-verde-oscuro');
      setTimeout(() => {
        btn.textContent = 'Agregar';
        btn.classList.remove('bg-verde-oscuro');
      }, 1200);
    });
  });
});
