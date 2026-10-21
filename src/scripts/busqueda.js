import { sinTildes } from './formato.js';

const PALABRAS_VACIAS = new Set([
  'de', 'del', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'y', 'o', 'a', 'al', 'en', 'con', 'para', 'por', 'sin', 'sobre',
  'necesito', 'busco', 'quiero', 'algo', 'sirve', 'dame', 'porfa', 'favor',
  'precio', 'cuanto', 'cuanto', 'tiene', 'hay', 'tienen',
]);

export function construirIndice(productos) {
  return productos.map((p) => ({
    slug: p.slug,
    titulo: p.titulo,
    categoria: p.categoria,
    marca: p.marca,
    texto: sinTildes(
      [p.titulo, p.marca, p.subcategoria, p.descripcion, p.categoria]
        .filter(Boolean)
        .join(' ')
    ),
  }));
}

export function buscar(indice, consulta, sinonimos = {}) {
  const q = sinTildes(consulta).trim();
  if (!q) return [];

  let terminos = q.split(/\s+/).filter((t) => t.length >= 2 && !PALABRAS_VACIAS.has(t));
  if (terminos.length === 0) terminos = q.split(/\s+/).filter((t) => t.length >= 2);

  const expansion = [];
  for (const [clave, valores] of Object.entries(sinonimos)) {
    const k = sinTildes(clave);
    const vals = (Array.isArray(valores) ? valores : [valores]).map(sinTildes);
    for (const t of terminos) {
      if (k.includes(t) || t.includes(k)) expansion.push(k, ...vals);
      if (vals.some((v) => v.includes(t) || t.includes(v))) expansion.push(k, ...vals);
    }
  }
  const todos = [...new Set([...terminos, ...expansion])];

  const resultados = [];
  for (const item of indice) {
    let puntos = 0;
    for (const t of terminos) {
      if (item.texto.includes(t)) puntos += 2;
    }
    for (const t of expansion) {
      if (item.texto.includes(t)) puntos += 1;
    }
    if (puntos > 0) resultados.push({ slug: item.slug, puntos });
  }
  resultados.sort((a, b) => b.puntos - a.puntos);
  return resultados.map((r) => r.slug);
}
