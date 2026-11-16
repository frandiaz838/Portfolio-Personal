/**
 * Renderer WebGL2 del objeto de partículas. Sin Three.js: ~6 KB en vez de ~150 KB.
 *
 * Idea: todas las formas viven en la GPU como atributos (aShape0..aShape4).
 * El vertex shader las mezcla con pesos según `uMorph` (0 → 4, continuo),
 * así que cambiar de forma no cuesta nada en CPU: solo se actualiza un float por frame.
 *
 * Este módulo se importa de forma dinámica (code splitting) desde morph-canvas.tsx.
 */
import { SHAPES, randoms } from "./shapes";

export type StageParams = {
  /** Desplazamiento en pantalla (NDC: -1..1) */
  x: number;
  y: number;
  scale: number;
  opacity: number;
};

export type RendererOptions = {
  count: number;
  maxDpr: number;
  /** false → dibuja un solo frame (prefers-reduced-motion) */
  animate: boolean;
  stages: readonly StageParams[];
};

const VERT = /* glsl */ `#version 300 es
precision highp float;

in vec3 aShape0;
in vec3 aShape1;
in vec3 aShape2;
in vec3 aShape3;
in vec3 aShape4;
in vec4 aRand;

uniform float uMorph;
uniform float uTime;
uniform vec2 uPointer;
uniform mat4 uProj;
uniform vec2 uOffset;
uniform float uScale;
uniform float uPixelRatio;
uniform float uSize;

out vec3 vColor;
out float vAlpha;

const vec3 DEEP = vec3(0.55, 0.12, 0.05);
const vec3 EMBER = vec3(1.0, 0.36, 0.18);
const vec3 HOT = vec3(1.0, 0.72, 0.45);

mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }

void main() {
  // Pesos lineales: en uMorph = 1.3 → 70% forma 1, 30% forma 2
  float w0 = clamp(1. - abs(uMorph - 0.), 0., 1.);
  float w1 = clamp(1. - abs(uMorph - 1.), 0., 1.);
  float w2 = clamp(1. - abs(uMorph - 2.), 0., 1.);
  float w3 = clamp(1. - abs(uMorph - 3.), 0., 1.);
  float w4 = clamp(1. - abs(uMorph - 4.), 0., 1.);
  vec3 p = aShape0 * w0 + aShape1 * w1 + aShape2 * w2 + aShape3 * w3 + aShape4 * w4;

  // A mitad de camino entre formas, las partículas se dispersan como chispas
  float transit = sin(3.14159265 * fract(uMorph));

  // Núcleo que respira / ola que ondula
  p *= 1. + 0.05 * sin(uTime * 1.3 + p.y * 4.) * w0;
  p.y += w4 * sin(p.x * 2.4 + uTime * 0.9) * cos(p.z * 2.1 + uTime * 0.7) * 0.2;

  vec3 seed = aRand.xyz * 6.2831;
  p += vec3(
    sin(p.y * 3.1 + uTime * 0.7 + seed.x),
    sin(p.z * 2.7 + uTime * 0.6 + seed.y),
    sin(p.x * 2.9 + uTime * 0.8 + seed.z)
  ) * (0.015 + 0.38 * transit * aRand.w);

  // Rotación lenta + inclinación según el puntero
  p = rotY(uTime * 0.08 + uPointer.x * 0.35) * rotX(0.28 + w4 * 0.45 - uPointer.y * 0.22) * p;

  vec3 view = p * uScale;
  view.z -= 5.;
  gl_Position = uProj * vec4(view, 1.);
  gl_Position.xy += uOffset * gl_Position.w;

  float depth = -view.z;
  gl_PointSize = uSize * uPixelRatio * (0.45 + aRand.w * 0.9) / depth * (1. + transit * 0.6);

  float heat = aRand.x;
  vec3 color = mix(DEEP, EMBER, smoothstep(0.0, 0.7, heat));
  color = mix(color, HOT, smoothstep(0.86, 1.0, heat));
  float flicker = 0.6 + 0.4 * sin(uTime * (1.2 + aRand.y * 3.) + aRand.z * 40.);
  vColor = color;
  vAlpha = flicker * smoothstep(7.5, 3.6, depth);
}`;

const FRAG = /* glsl */ `#version 300 es
precision mediump float;

in vec3 vColor;
in float vAlpha;
uniform float uOpacity;
out vec4 outColor;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a * vAlpha * uOpacity;
  outColor = vec4(vColor * a, a); // premultiplicado → blending aditivo tipo luz
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("No se pudo crear el shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Error compilando shader");
  }
  return shader;
}

function perspective(fovY: number, aspect: number, near: number, far: number): Float32Array {
  // En pantallas verticales (mobile) ensanchamos el FOV para que el objeto no se corte a los lados
  const f = (1 / Math.tan(fovY / 2)) * Math.min(1, aspect * 1.15);
  const nf = 1 / (near - far);
  // prettier-ignore
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Suavizado independiente del frame rate (igual a 60 que a 120 Hz) */
const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

export class MorphRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private buffers: WebGLBuffer[] = [];
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private raf = 0;
  private startTime = performance.now();
  private lastFrame = performance.now();

  private morph = 0;
  private targetMorph = 0;
  private pointer = { x: 0, y: 0 };
  private targetPointer = { x: 0, y: 0 };
  private params: StageParams;

  constructor(
    private canvas: HTMLCanvasElement,
    private options: RendererOptions,
  ) {
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false, // puntos con borde suave en el shader: no hace falta MSAA
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) throw new Error("WebGL2 no disponible");
    this.gl = gl;

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Error linkeando programa");
    }
    this.program = program;
    gl.useProgram(program);

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    const { count } = options;
    SHAPES.forEach((shape, i) => this.attribute(`aShape${i}`, shape(count), 3));
    this.attribute("aRand", randoms(count), 4);

    for (const name of [
      "uMorph",
      "uTime",
      "uPointer",
      "uProj",
      "uOffset",
      "uScale",
      "uPixelRatio",
      "uSize",
      "uOpacity",
    ]) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE); // aditivo: donde se superponen partículas, brilla más

    this.params = { ...this.stageAt(0) };
    this.resize();
  }

  private attribute(name: string, data: Float32Array, size: number) {
    const { gl } = this;
    const location = gl.getAttribLocation(this.program, name);
    if (location < 0) return;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    this.buffers.push(buffer);
  }

  /** Parámetros interpolados para un valor de morph continuo (ej. 1.4) */
  private stageAt(morph: number): StageParams {
    const { stages } = this.options;
    const i = Math.min(Math.floor(morph), stages.length - 1);
    const a = stages[i]!;
    const b = stages[Math.min(i + 1, stages.length - 1)]!;
    const t = morph - i;
    return {
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      scale: lerp(a.scale, b.scale, t),
      opacity: lerp(a.opacity, b.opacity, t),
    };
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, this.options.maxDpr);
    const { clientWidth: w, clientHeight: h } = this.canvas;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    const { gl } = this;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.uniformMatrix4fv(this.uniforms.uProj!, false, perspective(0.62, w / h, 0.1, 50));
    gl.uniform1f(this.uniforms.uPixelRatio!, dpr);
    // Tamaño de partícula relativo a la altura: se ve igual en cualquier pantalla
    gl.uniform1f(this.uniforms.uSize!, Math.max(10, h * 0.028));
    if (!this.options.animate) this.draw(0);
  }

  setTarget(morph: number) {
    this.targetMorph = Math.max(0, Math.min(SHAPES.length - 1, morph));
    if (!this.options.animate) {
      // Sin animación: salto directo a la forma de la sección, sin transición
      const snapped = Math.round(this.targetMorph);
      if (snapped !== this.morph) {
        this.morph = snapped;
        this.params = this.stageAt(snapped);
        this.draw(0);
      }
    }
  }

  setPointer(x: number, y: number) {
    this.targetPointer.x = x;
    this.targetPointer.y = y;
  }

  start() {
    if (!this.options.animate) {
      this.draw(0);
      return;
    }
    const loop = (now: number) => {
      const dt = Math.min((now - this.lastFrame) / 1000, 0.1);
      this.lastFrame = now;
      this.morph = damp(this.morph, this.targetMorph, 3.2, dt);
      this.pointer.x = damp(this.pointer.x, this.targetPointer.x, 2.5, dt);
      this.pointer.y = damp(this.pointer.y, this.targetPointer.y, 2.5, dt);
      const target = this.stageAt(this.morph);
      this.params = target;
      this.draw((now - this.startTime) / 1000);
      this.raf = requestAnimationFrame(loop);
    };
    this.lastFrame = performance.now();
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    cancelAnimationFrame(this.raf);
  }

  private draw(time: number) {
    const { gl, uniforms: u, params } = this;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(u.uMorph!, this.morph);
    gl.uniform1f(u.uTime!, time);
    gl.uniform2f(u.uPointer!, this.pointer.x, this.pointer.y);
    gl.uniform2f(u.uOffset!, params.x, params.y);
    gl.uniform1f(u.uScale!, params.scale);
    gl.uniform1f(u.uOpacity!, params.opacity);
    gl.drawArrays(gl.POINTS, 0, this.options.count);
  }

  dispose() {
    this.stop();
    const { gl } = this;
    this.buffers.forEach((b) => gl.deleteBuffer(b));
    gl.deleteVertexArray(this.vao);
    gl.deleteProgram(this.program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
