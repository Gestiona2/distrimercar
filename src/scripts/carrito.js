import {
  leerCarrito,
  cambiarCantidad,
  quitar,
  total,
  conteo,
  mensajeWhatsApp,
  enlaceWhatsApp,
} from './pedido.js';
import { pesos } from './formato.js';

export function montarCarrito(config) {
  const raiz = document.getElementById('carrito');
  const lista = document.getElementById('carrito-lista');
  const vacio = document.getElementById('carrito-vacio');
  const pie = document.getElementById('carrito-pie');
  const totalEl = document.getElementById('carrito-total');
  const botonesAbrir = document.querySelectorAll('[data-abrir-carrito]');
  const botonCerrar = document.getElementById('carrito-cerrar');
  const overlay = document.getElementById('carrito-overlay');
  const badge = document.getElementById('carrito-badge');
  const enviar = document.getElementById('carrito-enviar');
  const form = document.getElementById('carrito-entrega');

  if (!raiz || !lista) return;

  const B = window.__DM_BASE__ || '';

  function abrir() {
    raiz.classList.remove('pointer-events-none', 'opacity-0');
    document.body.style.overflow = 'hidden';
    pintar();
  }
  function cerrar() {
    raiz.classList.add('pointer-events-none', 'opacity-0');
    document.body.style.overflow = '';
  }

  botonesAbrir.forEach((b) => b.addEventListener('click', abrir));
  botonCerrar?.addEventListener('click', cerrar);
  overlay?.addEventListener('click', cerrar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrar();
  });

  function pintar() {
    const carrito = leerCarrito();
    const n = conteo(carrito);
    if (badge) {
      badge.textContent = String(n);
      badge.classList.toggle('hidden', n === 0);
    }
    vacio?.classList.toggle('hidden', n > 0);
    pie?.classList.toggle('hidden', n === 0);
    if (totalEl) totalEl.textContent = pesos(total(carrito));

    lista.innerHTML = carrito
      .map(
        (l) => `
      <li class="flex gap-3 border-b border-verde-claro py-3" data-slug="${l.slug}">
        <div class="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
          <img src="${B}/img/productos/${l.imagen}" alt="" class="h-full w-full object-contain" loading="lazy" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="clamp-2 text-sm font-bold leading-tight">${l.titulo}</p>
          <p class="mt-0.5 text-xs text-tinta-suave">${pesos(l.precio)} c/u</p>
          <div class="mt-1.5 flex items-center gap-2">
            <button data-menos class="h-7 w-7 rounded-lg border border-verde/30 font-bold text-verde hover:bg-verde-claro" aria-label="Quitar uno">−</button>
            <span class="w-6 text-center text-sm font-bold">${l.cantidad}</span>
            <button data-mas class="h-7 w-7 rounded-lg border border-verde/30 font-bold text-verde hover:bg-verde-claro" aria-label="Agregar uno">+</button>
            <button data-quitar class="ml-auto text-xs font-semibold text-naranja hover:underline">Quitar</button>
          </div>
        </div>
      </li>`
      )
      .join('');

    lista.querySelectorAll('li').forEach((li) => {
      const slug = li.getAttribute('data-slug');
      const l = leerCarrito().find((x) => x.slug === slug);
      li.querySelector('[data-mas]')?.addEventListener('click', () => cambiarCantidad(slug, (l?.cantidad || 0) + 1));
      li.querySelector('[data-menos]')?.addEventListener('click', () => cambiarCantidad(slug, (l?.cantidad || 0) - 1));
      li.querySelector('[data-quitar]')?.addEventListener('click', () => quitar(slug));
    });
  }

  form?.addEventListener('submit', (e) => e.preventDefault());
  enviar?.addEventListener('click', () => {
    const carrito = leerCarrito();
    if (carrito.length === 0) return;
    const datos = {
      nombre: document.getElementById('entrega-nombre')?.value?.trim() || '',
      direccion: document.getElementById('entrega-direccion')?.value?.trim() || '',
      nota: document.getElementById('entrega-nota')?.value?.trim() || '',
    };
    const pagoSel = document.getElementById('entrega-pago');
    if (pagoSel && pagoSel.value) datos.pago = pagoSel.options[pagoSel.selectedIndex].text;
    const msg = mensajeWhatsApp(carrito, config, datos);
    window.open(enlaceWhatsApp(config.whatsapp, msg), '_blank', 'noopener');
  });

  window.addEventListener('carrito:cambio', pintar);
  pintar();
}
