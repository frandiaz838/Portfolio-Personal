/**
 * Generadores de formas para el objeto de partículas. Funciones puras (testeables).
 *
 * Clave del efecto: la partícula i de cada forma se calcula a partir del mismo
 * parámetro t = i / count. Así, al mezclar dos formas, partículas vecinas viajan
 * juntas y la transición se ve como una deformación, no como ruido aleatorio.
 *
 * Todas las formas se normalizan a un radio aproximado de 1.2 unidades.
 */

export type Shape = Float32Array; // [x0, y0, z0, x1, y1, z1, ...]

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const TAU = Math.PI * 2;

function make(count: number, fn: (i: number, t: number, out: [number, number, number]) => void) {
  const data = new Float32Array(count * 3);
  const p: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < count; i++) {
    fn(i, i / count, p);
    data[i * 3] = p[0];
    data[i * 3 + 1] = p[1];
    data[i * 3 + 2] = p[2];
  }
  return data;
}

/** Punto i de una esfera de Fibonacci (distribución uniforme). */
function fibonacci(i: number, count: number): [number, number, number] {
  const y = 1 - (2 * (i + 0.5)) / count;
  const r = Math.sqrt(1 - y * y);
  const phi = i * GOLDEN_ANGLE;
  return [Math.cos(phi) * r, y, Math.sin(phi) * r];
}

/** 0 · Núcleo: esfera con algo de volumen (capas internas) para que se lea como brasa. */
export function sphere(count: number): Shape {
  return make(count, (i, _t, out) => {
    const [x, y, z] = fibonacci(i, count);
    const shell = i % 7 === 0 ? 0.55 + 0.35 * ((i * 0.618) % 1) : 1; // ~14% adentro
    const r = 1.15 * shell;
    out[0] = x * r;
    out[1] = y * r;
    out[2] = z * r;
  });
}

/** 1 · Nudo toroidal (2,3): sistemas entrelazados. Tubo difuso alrededor de la curva. */
export function torusKnot(count: number): Shape {
  const p = 2;
  const q = 3;
  return make(count, (i, t, out) => {
    const u = t * TAU;
    const r = Math.cos(q * u) + 2;
    const [ox, oy, oz] = fibonacci(i, count); // dirección para engrosar el tubo
    const tube = 0.28 * Math.cbrt((i * 0.754877) % 1); // relleno del tubo, denso al centro
    out[0] = (r * Math.cos(p * u)) / 2.6 + ox * tube;
    out[1] = (r * Math.sin(p * u)) / 2.6 + oy * tube;
    out[2] = -Math.sin(q * u) / 2.6 + oz * tube;
  });
}

/** 2 · Doble hélice: el "ADN" de la sección Sobre mí, con escalones entre hebras. */
export function helix(count: number): Shape {
  return make(count, (i, t, out) => {
    const turns = 2.25;
    const angle = t * TAU * turns;
    const y = (t - 0.5) * 2.8;
    const radius = 0.62;
    const isRung = i % 9 === 0;
    const strand = i % 2;
    const jitter = (((i * 0.618034) % 1) - 0.5) * 0.08;

    if (isRung) {
      // escalón: punto sobre la recta que une ambas hebras
      const k = ((i * 0.381966) % 1) * 2 - 1;
      out[0] = Math.cos(angle) * radius * k;
      out[1] = y;
      out[2] = Math.sin(angle) * radius * k;
      return;
    }
    const a = angle + strand * Math.PI;
    out[0] = Math.cos(a) * radius + jitter;
    out[1] = y + jitter;
    out[2] = Math.sin(a) * radius - jitter;
  });
}

/** 3 · Retícula cúbica: estructura, capas. Grilla regular sobre las 6 caras. */
export function cube(count: number): Shape {
  const perFace = Math.ceil(count / 6);
  const side = Math.ceil(Math.sqrt(perFace));
  const half = 0.82;
  return make(count, (i, _t, out) => {
    const face = i % 6;
    const k = Math.floor(i / 6);
    const a = ((k % side) / (side - 1)) * 2 - 1;
    const b = (Math.floor(k / side) / (side - 1)) * 2 - 1;
    const axis = face >> 1; // 0: x, 1: y, 2: z
    const sign = face & 1 ? 1 : -1;
    const v = [a * half, b * half, sign * half];
    // rotamos qué eje es "la cara" para cubrir las 3 orientaciones
    out[0] = v[(axis + 1) % 3]!;
    out[1] = v[(axis + 2) % 3]!;
    out[2] = v[axis % 3]!;
  });
}

/** 4 · Ola: plano de partículas. La ondulación se anima en el shader. */
export function wave(count: number): Shape {
  const side = Math.ceil(Math.sqrt(count));
  return make(count, (i, _t, out) => {
    const x = ((i % side) / (side - 1)) * 2 - 1;
    const z = (Math.floor(i / side) / (side - 1)) * 2 - 1;
    out[0] = x * 1.35;
    out[1] = 0;
    out[2] = z * 1.35;
  });
}

/** Orden = orden de las secciones (data-morph-stage). */
export const SHAPES = [sphere, torusKnot, helix, cube, wave] as const;

/** Atributo aleatorio por partícula (tamaño, fase de parpadeo, color). Seed fija → determinístico. */
export function randoms(count: number, seed = 1337): Float32Array {
  const out = new Float32Array(count * 4);
  let s = seed;
  for (let i = 0; i < out.length; i++) {
    // mulberry32
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    out[i] = ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  }
  return out;
}
