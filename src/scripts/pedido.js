const CLAVE = 'distrimercar-carrito-v1';

export function leerCarrito() {
  try {
    const crudo = JSON.parse(localStorage.getItem(CLAVE) || '[]');
    if (!Array.isArray(crudo)) return [];
    return crudo.filter(
      (l) =>
        l &&
        typeof l.slug === 'string' &&
        typeof l.titulo === 'string' &&
        typeof l.precio === 'number' &&
        Number.isFinite(l.precio) &&
        typeof l.cantidad === 'number' &&
        l.cantidad > 0
    );
  } catch {
    return [];
  }
}

export function guardarCarrito(lineas) {
  localStorage.setItem(CLAVE, JSON.stringify(lineas));
  window.dispatchEvent(new CustomEvent('carrito:cambio', { detail: lineas }));
}

export function agregar(linea, cantidad = 1) {
  const carrito = leerCarrito();
  const existente = carrito.find((l) => l.slug === linea.slug);
  if (existente) existente.cantidad += cantidad;
  else carrito.push({ ...linea, cantidad });
  guardarCarrito(carrito);
}

export function cambiarCantidad(slug, cantidad) {
  let carrito = leerCarrito();
  if (cantidad <= 0) carrito = carrito.filter((l) => l.slug !== slug);
  else {
    const l = carrito.find((x) => x.slug === slug);
    if (l) l.cantidad = cantidad;
  }
  guardarCarrito(carrito);
}

export function quitar(slug) {
  guardarCarrito(leerCarrito().filter((l) => l.slug !== slug));
}

export function vaciar() {
  guardarCarrito([]);
}

export function total(carrito) {
  return carrito.reduce((s, l) => s + l.precio * l.cantidad, 0);
}

export function conteo(carrito) {
  return carrito.reduce((s, l) => s + l.cantidad, 0);
}

export function mensajeWhatsApp(carrito, config, datosEntrega = {}) {
  const lineas = carrito.map(
    (l) =>
      `• ${l.titulo} x${l.cantidad} — ${pesosLocal(l.precio * l.cantidad)}`
  );
  const t = total(carrito);
  const partes = [
    `Hola ${config.nombre}, quiero hacer este pedido:`,
    '',
    ...lineas,
    '',
    `Total productos: ${pesosLocal(t)}`,
  ];
  if (datosEntrega.nombre) partes.push('', `Nombre: ${datosEntrega.nombre}`);
  if (datosEntrega.direccion) partes.push(`Dirección: ${datosEntrega.direccion}`);
  if (datosEntrega.nota) partes.push(`Nota: ${datosEntrega.nota}`);
  partes.push('', '(Los precios son de demostración)');
  return partes.join('\n');
}

export function enlaceWhatsApp(numero, mensaje) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

function pesosLocal(n) {
  return '$' + n.toLocaleString('es-CO');
}
