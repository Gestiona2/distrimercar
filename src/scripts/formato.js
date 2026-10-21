export function pesos(n) {
  if (typeof n !== 'number' || !isFinite(n)) return '';
  return '$' + n.toLocaleString('es-CO');
}

export function sinTildes(texto) {
  return (texto || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
