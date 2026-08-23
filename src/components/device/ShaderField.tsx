"use client";

import { useEffect, useRef } from "react";

/**
 * ShaderField · rohes WebGL · KEINE library (three.js wären ~600KB und
 * würden die 95+ lighthouse killen · das hier sind 0 KB dependency).
 *
 * fließendes fbm-noise-feld in ink → lila → lime, das auf den cursor
 * reagiert (trägheit, kein hartes springen). läuft auf der GPU, der
 * main-thread macht nichts außer uniforms setzen.
 *
 * respektiert prefers-reduced-motion (rendert dann EIN standbild) und
 * pausiert wenn das canvas nicht sichtbar ist (kein akku-fresser).
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5 * u_res) / u_res.y;

  float t = u_time * 0.045;

  /* domain warp · zwei fbm-lagen die sich gegenseitig verzerren →
     das "flüssige" fließen statt statischem rauschen */
  vec2 q = vec2(fbm(p * 1.4 + vec2(t, t * 0.6)), fbm(p * 1.4 + vec2(5.2, 1.3) - t * 0.7));
  vec2 r = vec2(fbm(p * 1.4 + 3.0 * q + vec2(1.7, 9.2) + t * 0.5),
                fbm(p * 1.4 + 3.0 * q + vec2(8.3, 2.8) - t * 0.4));
  float f = fbm(p * 1.4 + 3.4 * r);

  /* cursor-halo · zieht das feld lokal nach oben */
  float d = length(p - m);
  f += 0.30 / (1.0 + d * d * 26.0);

  vec3 ink  = vec3(0.039, 0.039, 0.039);
  vec3 lila = vec3(0.690, 0.518, 0.827);
  vec3 lime = vec3(0.882, 0.992, 0.322);

  vec3 col = ink;
  col = mix(col, lila * 0.30, smoothstep(0.34, 0.76, f));

  /* scanline und vignette laufen VOR dem lime-anteil.
     vorher lagen sie danach und multiplizierten das lime mit
     runter · zusammen mit opacity:0.5 auf dem canvas landete der
     hellste punkt des feldes bei #737f35. oliv, nicht neon.
     jetzt dämpft die fläche sich selbst und lime bleibt lime. */
  col *= 1.0 - 0.045 * sin(gl_FragCoord.y * 1.6);
  col *= 1.0 - 0.55 * smoothstep(0.35, 1.25, length(p));

  /* schmaleres band, dafür voll · zurückhaltung über die FLÄCHE,
     nicht über die farbe */
  col = mix(col, lime, smoothstep(0.86, 1.00, f));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("[shader]", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function ShaderField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    /* dpr gedeckelt · retina voll auflösen kostet 4x fillrate für nix.
       ZUSÄTZLICH ein deckel auf die absolute breite: der shader
       rechnet fünf fbm-oktaven pro fragment, das sind rund hundert
       sinus-aufrufe je pixel. auf einem 5K-schirm wären das über
       elf millionen fragmente pro frame. das feld ist eine weiche,
       konturlose wolke — auf 1600 gerechnet und vom browser
       hochskaliert sieht man keinen unterschied, weil es nichts
       gibt, dessen kante man vermissen könnte. */
    const MAX_BREITE = 1600;
    const rohDpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0;
    let h = 0;
    let dpr = rohDpr;

    const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* die geometrie der fläche wird GEMERKT · onMove holte sie sich
       vorher bei jedem pointermove neu, und der listener hängt am
       window, feuert also auch dann, wenn der hero längst
       weggescrollt ist. jedes getBoundingClientRect erzwingt ein
       layout. */
    const flaeche = { left: 0, top: 0, height: 0 };

    /* ein einzelnes bild derselben szene · gebraucht bei
       reduced-motion und nach jedem echten resize */
    const standbild = () => {
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, 12);
      gl.uniform2f(uMouse, w * 0.5, h * 0.55);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    /* ZWEI GETRENNTE DINGE, und das ist wichtig:
         messen()  liest nur die geometrie · billig, darf bei jedem
                   scroll laufen.
         resize()  legt den zeichenpuffer NEU an · canvas.width zu
                   setzen leert ihn, auch wenn der wert gleich
                   bleibt. nur bei echtem grössenwechsel. */
    const messen = () => {
      const r = canvas.getBoundingClientRect();
      flaeche.left = r.left;
      flaeche.top = r.top;
      flaeche.height = r.height;
      return r;
    };

    const resize = () => {
      const r = messen();
      /* deckel auf die absolute breite: der shader rechnet fünf
         fbm-oktaven pro fragment, rund hundert sinus je pixel. auf
         einem 5K-schirm wären das über elf millionen fragmente pro
         frame. das feld ist eine weiche, konturlose wolke · auf
         1600 gerechnet und hochskaliert sieht man keinen
         unterschied, weil es keine kante gibt, die man vermisst. */
      dpr = Math.min(rohDpr, MAX_BREITE / Math.max(1, r.width));
      const nw = Math.max(1, Math.round(r.width * dpr));
      const nh = Math.max(1, Math.round(r.height * dpr));
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      /* canvas.width zu setzen LEERT den puffer. bei reduced-motion
         läuft keine schleife, die ihn wieder füllt · das feld blieb
         nach jedem resize schwarz (und weil der kontext mit
         alpha:false läuft, ist das deckendes schwarz, kein
         durchscheinender verlauf). */
      if (reduziert) standbild();
    };
    resize();
    window.addEventListener("resize", resize);

    /* maus mit trägheit · target vs. aktuell, jeden frame angenähert */
    const target = { x: w * 0.5, y: h * 0.55 };
    const cur = { x: target.x, y: target.y };

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      target.x = (e.clientX - flaeche.left) * dpr;
      target.y = (flaeche.height - (e.clientY - flaeche.top)) * dpr;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    /* die gemerkte geometrie wandert beim scrollen mit · messen(),
       NICHT resize(), sonst wird der puffer bei jedem scroll-
       ereignis geleert */
    window.addEventListener("scroll", messen, { passive: true });

    let raf = 0;
    const t0 = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      cur.x += (target.x - cur.x) * 0.055;
      cur.y += (target.y - cur.y) * 0.055;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduziert) {
      standbild();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", messen);
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
