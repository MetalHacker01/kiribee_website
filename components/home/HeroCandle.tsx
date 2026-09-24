"use client";

import { useEffect, useRef } from "react";
import { Bee } from "./Bee";
import s from "./home.module.css";

// Honeycomb beeswax pillar in SVG with a WebGL flame shader on the wick.
// The flame leans away from the pointer like a draught, the niche glow
// flickers with it, and two bees orbit. Without WebGL (or with reduced
// motion) a CSS flame stays in place.

const hexPath = (cx: number, cy: number, r = 10) => {
  const pts = [-90, -30, 30, 90, 150, 210].map((a) => {
    const t = (a * Math.PI) / 180;
    return `${(cx + r * Math.cos(t)).toFixed(2)} ${(cy + r * Math.sin(t)).toFixed(2)}`;
  });
  return `M${pts.join(" L")} Z`;
};
const HEX_TILE = [
  [0, 0],
  [17.32, 0],
  [8.66, 15],
  [0, 30],
  [17.32, 30],
]
  .map(([x, y]) => hexPath(x, y))
  .join(" ");

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uWind;
uniform float uFlick;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=0.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  float aspect=uRes.x/uRes.y;
  float len=0.74*(0.95+0.08*uFlick);
  float h=(uv.y-0.1)/len;
  float hc=clamp(h,0.0,1.0);
  float x=(uv.x-0.5)*aspect;
  float turb=fbm(vec2(x*7.0,h*3.2-uTime*2.7))-0.5;
  x-=uWind*0.2*hc*hc;
  x-=turb*0.075*hc;
  float w=0.135*pow(hc,0.42)*pow(1.0-hc,0.85)*2.1+0.002;
  float d=abs(x)/w;
  float body=(1.0-smoothstep(0.55,1.0,d))*step(0.0,h)*(1.0-smoothstep(0.9,1.0,h))*smoothstep(0.0,0.07,h);
  float core=(1.0-smoothstep(0.0,0.6,d))*(1.0-smoothstep(0.1,0.6,h))*smoothstep(0.02,0.12,h);
  vec3 col=mix(vec3(1.0,0.5,0.12),vec3(1.0,0.8,0.38),1.0-smoothstep(0.3,0.95,d));
  col=mix(col,vec3(1.0,0.98,0.9),core);
  float blue=(1.0-smoothstep(0.0,0.16,h))*smoothstep(-0.02,0.03,h)*(1.0-smoothstep(0.4,1.0,d));
  col=mix(col,vec3(0.35,0.5,1.0),blue*0.5);
  float a=body*(0.92-0.3*smoothstep(0.55,1.0,h));
  vec2 g=vec2(x*1.4,(h-0.3)*len*0.9);
  float edge=smoothstep(0.0,0.18,uv.x)*smoothstep(1.0,0.82,uv.x)*smoothstep(1.0,0.8,uv.y);
  float halo=exp(-dot(g,g)*40.0)*0.3*(0.85+0.3*uFlick)*edge;
  gl_FragColor=vec4(col*a+vec3(1.0,0.62,0.22)*halo*(1.0-a),a+halo*(1.0-a));
}`;

export function HeroCandle({ title, hint }: { title: string; hint: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!stage || !canvas || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let wind = 0;
    let target = 0;
    let lastX: number | null = null;
    let cleanup = () => {};

    const start = () => {
      if (disposed) return;
      const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
      if (!gl) return;

      const compile = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        return sh;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(prog, "uRes");
      const uTime = gl.getUniformLocation(prog, "uTime");
      const uWind = gl.getUniformLocation(prog, "uWind");
      const uFlick = gl.getUniformLocation(prog, "uFlick");

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
        canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // The flame leans away from a nearby pointer, and follows fast sweeps.
      const hero = stage.closest("section") ?? stage;
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        const fx = r.left + r.width / 2;
        const fy = r.top + r.height * 0.6;
        const dx = fx - e.clientX;
        const dist = Math.hypot(dx, fy - e.clientY);
        const near = Math.max(0, 1 - dist / 420);
        const sweep = lastX === null ? 0 : (e.clientX - lastX) * 0.012;
        lastX = e.clientX;
        target = Math.max(-0.75, Math.min(0.75, Math.sign(dx) * near * 0.8 + sweep));
      };
      const onLeave = () => {
        target = 0;
        lastX = null;
      };
      hero.addEventListener("pointermove", onMove as EventListener);
      hero.addEventListener("pointerleave", onLeave);

      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      });
      io.observe(stage);

      const t0 = performance.now();
      function frame(now: number) {
        raf = 0;
        if (!visible || document.hidden || !gl) return;
        const t = (now - t0) / 1000;
        target *= 0.985;
        wind += (target + Math.sin(t * 0.7) * 0.06 - wind) * 0.06;
        const flick =
          0.5 * Math.sin(t * 7.3) + 0.3 * Math.sin(t * 13.1 + 1.3) + 0.2 * Math.sin(t * 23.7 + 0.5);
        gl.uniform2f(uRes, canvas!.width, canvas!.height);
        gl.uniform1f(uTime, t);
        gl.uniform1f(uWind, wind);
        gl.uniform1f(uFlick, flick);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        glow!.style.opacity = String(0.82 + flick * 0.12);
        raf = requestAnimationFrame(frame);
      }
      const onVis = () => {
        if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame);
      };
      document.addEventListener("visibilitychange", onVis);

      stage.dataset.gl = "on";
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        ro.disconnect();
        io.disconnect();
        hero.removeEventListener("pointermove", onMove as EventListener);
        hero.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVis);
        cancelAnimationFrame(raf);
      };
    };

    // The shader compiles on the visitor's first interaction, so it never
    // weighs on page load. Until then the CSS flame burns; then it crossfades.
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart"] as const;
    const kick = () => {
      events.forEach((ev) => window.removeEventListener(ev, kick));
      requestAnimationFrame(start);
    };
    events.forEach((ev) => window.addEventListener(ev, kick, { passive: true, once: true }));

    return () => {
      disposed = true;
      events.forEach((ev) => window.removeEventListener(ev, kick));
      cleanup();
    };
  }, []);

  return (
    <figure className={s.candleFigure}>
      <div className={s.nicheFrame}>
        <div className={s.niche} ref={stageRef} data-loop>
          <div className={s.nicheGlow} ref={glowRef} aria-hidden="true" />
          <svg className={s.candleSvg} viewBox="0 0 200 300" aria-hidden="true">
            <defs>
              <linearGradient id="hc-body" x1="0" x2="1">
                <stop offset="0" stopColor="#8c500b" />
                <stop offset="0.2" stopColor="#cf8a1d" />
                <stop offset="0.44" stopColor="#f3c25a" />
                <stop offset="0.62" stopColor="#e6a638" />
                <stop offset="0.86" stopColor="#b06b10" />
                <stop offset="1" stopColor="#6e3e08" />
              </linearGradient>
              <linearGradient id="hc-shade" x1="0" x2="1">
                <stop offset="0" stopColor="#2a1400" stopOpacity="0.5" />
                <stop offset="0.22" stopColor="#2a1400" stopOpacity="0" />
                <stop offset="0.42" stopColor="#fff2c8" stopOpacity="0.22" />
                <stop offset="0.7" stopColor="#2a1400" stopOpacity="0" />
                <stop offset="1" stopColor="#2a1400" stopOpacity="0.6" />
              </linearGradient>
              <radialGradient id="hc-toplight" cx="0.5" cy="0" r="0.75">
                <stop offset="0" stopColor="#ffd98a" stopOpacity="0.75" />
                <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hc-pool" cx="0.5" cy="0.45" r="0.6">
                <stop offset="0" stopColor="#fff0b8" />
                <stop offset="0.5" stopColor="#f7cc62" />
                <stop offset="1" stopColor="#d9941f" />
              </radialGradient>
              <pattern id="hc-hex" width="17.32" height="30" patternUnits="userSpaceOnUse">
                <path d={HEX_TILE} fill="none" stroke="#fff0c2" strokeOpacity="0.32" strokeWidth="1.1" />
                <path
                  d={HEX_TILE}
                  fill="none"
                  stroke="#5a3006"
                  strokeOpacity="0.28"
                  strokeWidth="1"
                  transform="translate(0.8 1)"
                />
              </pattern>
              <clipPath id="hc-clip">
                <path d="M20 40 V282 Q20 292 30 292 H170 Q180 292 180 282 V40 Z" />
              </clipPath>
            </defs>

            <ellipse cx="100" cy="293" rx="104" ry="9" fill="#000" opacity="0.35" />
            <path d="M20 40 V282 Q20 292 30 292 H170 Q180 292 180 282 V40 Z" fill="url(#hc-body)" />
            <g clipPath="url(#hc-clip)">
              <rect x="20" y="36" width="160" height="260" fill="url(#hc-hex)" />
              <rect x="20" y="36" width="160" height="260" fill="url(#hc-shade)" />
              <rect className={s.candleLight} x="20" y="36" width="160" height="150" fill="url(#hc-toplight)" />
            </g>

            {/* Drips running down from the rim */}
            <g fill="#f6cd68">
              <path className={s.candleDrip} d="M46 44 C46 62 40 74 42 92 C43 101 52 101 52 92 C52 76 49 60 52 44 Z" />
              <path className={`${s.candleDrip} ${s.candleDrip2}`} d="M118 45 C118 56 114 64 115 76 C116 83 123 83 123 76 C123 64 121 55 124 45 Z" />
              <path className={`${s.candleDrip} ${s.candleDrip3}`} d="M150 44 C151 60 147 70 148 84 C149 91 156 91 156 84 C156 70 154 58 157 43 Z" />
            </g>

            <ellipse cx="100" cy="40" rx="80" ry="15" fill="#f0bc52" />
            <ellipse cx="100" cy="41" rx="64" ry="10.5" fill="url(#hc-pool)" />
            <ellipse cx="84" cy="38" rx="20" ry="2.6" fill="#fff8dc" opacity="0.55" />
            <path d="M100 41 C101 33 99 27 100 19" stroke="#2a1a0c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <circle cx="100" cy="19.5" r="1.7" fill="#ff9a3c" />
          </svg>

          <div className={s.flameWrap}>
            <span className={s.cssFlame} aria-hidden="true" />
            <canvas ref={canvasRef} className={s.flameCanvas} aria-hidden="true" />
          </div>

          <span className={`${s.orbit} ${s.orbitA}`} aria-hidden="true">
            <Bee className={s.orbitBee} />
          </span>
          <span className={`${s.orbit} ${s.orbitB}`} aria-hidden="true">
            <Bee className={s.orbitBee} />
          </span>
        </div>
      </div>
      <figcaption className={s.plaque}>
        <span className={s.plaqueName}>{title}</span>
        <span className={s.plaqueMeta}>{hint}</span>
      </figcaption>
    </figure>
  );
}
