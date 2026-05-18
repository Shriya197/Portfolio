import { useCallback, useEffect, useMemo, useRef, useState } from "react";


const SKILLS = [
  { label: "React",       tier: 0, url: "https://react.dev" },
  { label: "Next.js",     tier: 0, url: "https://nextjs.org" },
  { label: "TypeScript",  tier: 0, url: "https://typescriptlang.org" },
  { label: "JavaScript",  tier: 0, url: "https://developer.mozilla.org" },
  { label: "Node.js",     tier: 1, url: "https://nodejs.org" },
  { label: "MongoDB",     tier: 1, url: "https://mongodb.com" },
  { label: "Express",     tier: 1, url: "https://expressjs.com" },
  { label: "Angular",     tier: 2, url: "https://angular.io" },
  { label: "Webpack",     tier: 2, url: "https://webpack.js.org" },
  { label: "Vite",        tier: 2, url: "https://vitejs.dev" },
  { label: "Git",         tier: 2, url: "https://git-scm.com" },
  { label: "REST APIs",   tier: 2, url: "#" },
];

function fibonacciSphere(count: number, radius: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return points;
}

export default function SkillSphere() {
  const RADIUS = 140;
  const W = 360;
  const H = 360;
 
  // Raw rotation values — updated in rAF loop
  const rotXRef = useRef(0.3);
  const rotYRef = useRef(0);
 
  // Smooth (spring-like) display values — what we actually render
  const dispXRef = useRef(0.3);
  const dispYRef = useRef(0);
 
  const [renderTick, setRenderTick] = useState(0); // forces a re-render each frame
 
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);
  const rafRef = useRef<number | null>(null);
 
  // Detect dark mode
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
 
  // rAF loop — auto-rotate + lerp display values toward target
  useEffect(() => {
    const loop = () => {
      if (!hoveredRef.current && !dragging.current) {
        rotYRef.current += 0.007;
        rotXRef.current = 0.3 + Math.sin(Date.now() / 4000) * 0.18;
      }
      // Lerp display toward target (acts as a spring)
      const lerpFactor = 0.08;
      dispXRef.current += (rotXRef.current - dispXRef.current) * lerpFactor;
      dispYRef.current += (rotYRef.current - dispYRef.current) * lerpFactor;
 
      setRenderTick(t => t + 1); // trigger re-render
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);
 
  // Mouse drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    rotYRef.current += dx * 0.008;
    rotXRef.current += dy * 0.008;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);
 
  // Touch support
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    last.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return;
    const dx = e.touches[0].clientX - last.current.x;
    const dy = e.touches[0].clientY - last.current.y;
    rotYRef.current += dx * 0.008;
    rotXRef.current += dy * 0.008;
    last.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
 
  // Project 3-D → 2-D
  const project = useCallback((
    px: number, py: number, pz: number,
    rx: number, ry: number
  ) => {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = px * cosY + pz * sinY;
    const z1 = -px * sinY + pz * cosY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y1 = py * cosX - z1 * sinX;
    const z2 = py * sinX + z1 * cosX;
    const fov = 500;
    const scale = fov / (fov + z2 + RADIUS);
    return {
      sx: x1 * scale + W / 2,
      sy: y1 * scale + H / 2,
      z: z2,
      scale,
      depth: (z2 + RADIUS) / (2 * RADIUS),
    };
  }, []);
 
  const points = useMemo(() => fibonacciSphere(SKILLS.length, RADIUS), []);
 
  // Tier styles — strong contrast in both modes
  const tierStyle = (tier: number, depth: number, isHov: boolean, dark: boolean) => {
    // Dark mode palette
    const darkConfigs = [
      { color: "#5eead4", rgb: "94,234,212",  fontSize: 15, fontWeight: 700 },
      { color: "#818cf8", rgb: "129,140,248", fontSize: 13, fontWeight: 600 },
      { color: "#94a3b8", rgb: "148,163,184", fontSize: 11, fontWeight: 500 },
    ];
    // Light mode palette — deeper, more saturated so nodes pop on white
    const lightConfigs = [
      { color: "#0f766e", rgb: "15,118,110",  fontSize: 15, fontWeight: 700 }, // teal-700
      { color: "#4f46e5", rgb: "79,70,229",   fontSize: 13, fontWeight: 600 }, // indigo-600
      { color: "#334155", rgb: "51,65,85",    fontSize: 11, fontWeight: 500 }, // slate-700
    ];
 
    const cfg = dark ? darkConfigs[Math.min(tier, 2)] : lightConfigs[Math.min(tier, 2)];
 
    // Depth curve: back nodes fade strongly, front nodes are crisp
    // Light mode: steeper curve so contrast difference is obvious (depth effect)
    const minOp = dark ? 0.15 : 0.08;
    const curve = dark ? 2.0 : 2.5; // power curve — makes front/back split sharper
    const opacity = isHov ? 1 : minOp + Math.pow(depth, curve) * (1 - minOp);
 
    // Pill background: front nodes get a coloured pill, back nodes transparent
    const bgThreshold = dark ? 0.52 : 0.45;
    const bgAlpha = isHov
      ? (dark ? 0.22 : 0.12)
      : depth > bgThreshold
        ? Math.pow((depth - bgThreshold) / (1 - bgThreshold), 1.5) * (dark ? 0.2 : 0.1)
        : 0;
 
    // Border
    const brdThreshold = dark ? 0.58 : 0.5;
    const brdAlpha = isHov
      ? (dark ? 0.55 : 0.4)
      : depth > brdThreshold
        ? Math.pow((depth - brdThreshold) / (1 - brdThreshold), 1.5) * (dark ? 0.45 : 0.3)
        : 0;
 
    // Glow — only meaningful on dark; light mode uses drop-shadow instead
    const glowPx = isHov ? 16 : depth > 0.78 ? (depth - 0.78) * 50 : 0;
    const glowAlpha = isHov ? (dark ? 0.5 : 0.25) : depth > 0.78 ? (depth - 0.78) * 0.6 : 0;
 
    // Light mode: crisp drop-shadow on front nodes gives depth without glow
    const dropShadow = !dark && depth > 0.6
      ? `drop-shadow(0 1px 3px rgba(${cfg.rgb}, ${(depth - 0.6) * 0.5}))`
      : "";
 
    return {
      fontSize:   cfg.fontSize,
      fontWeight: cfg.fontWeight,
      opacity,
      color:  cfg.color,
      bg:     bgAlpha > 0.005 ? `rgba(${cfg.rgb}, ${bgAlpha})` : "transparent",
      border: `1px solid rgba(${cfg.rgb}, ${brdAlpha})`,
      shadow: glowPx > 0.5
        ? `0 0 ${glowPx}px rgba(${cfg.rgb}, ${glowAlpha}), 0 1px 6px rgba(0,0,0,${dark ? 0.18 : 0.06})`
        : "none",
      filter: dropShadow,
    };
  };
 
  const rx = dispXRef.current;
  const ry = dispYRef.current;
 
  const projected = points
    .map((p, i) => ({ ...project(p.x, p.y, p.z, rx, ry), skill: SKILLS[i], i }))
    .sort((a, b) => a.z - b.z);
 
  // Orbit rings — three tilted ellipses that rotate with the sphere
  const ringAngles = [0, Math.PI / 3, (2 * Math.PI) / 3];
  const accentRgbStr = isDark ? "94,234,212" : "13,148,136";
 
  // Light mode: layered mesh — teal core fading to indigo edge, gives the sphere
  // a visible presence on white without a hard bounding box.
  const containerBg = isDark
    ? "transparent"
    : `radial-gradient(ellipse 70% 70% at 50% 50%, rgba(13,148,136,0.09) 0%, rgba(99,102,241,0.06) 55%, rgba(13,148,136,0.03) 80%, transparent 100%)`;
 
  return (
    <div
      className="relative select-none"
      style={{
        width: W,
        height: H,
        cursor: dragging.current ? "grabbing" : "grab",
        background: containerBg,
        borderRadius: "50%",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => { onMouseUp(); hoveredRef.current = false; setHovered(null); }}
      onMouseEnter={() => { hoveredRef.current = true; }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      {/* ── Sphere boundary ring (light mode only) ── */}
      {!isDark && (
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1.5px solid rgba(13,148,136,0.2)",
          boxShadow: "inset 0 0 60px rgba(13,148,136,0.07), inset 0 0 20px rgba(99,102,241,0.05), 0 0 0 1px rgba(99,102,241,0.08)",
          pointerEvents: "none",
        }} />
      )}
 
      {/* ── SVG orbit rings ── */}
      <svg
        style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
        width={W} height={H}
      >
        <defs>
          <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={`rgba(${accentRgbStr}, ${isDark ? 0.07 : 0.12})`} />
            <stop offset="60%"  stopColor={`rgba(${accentRgbStr}, ${isDark ? 0.03 : 0.05})`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
 
        {/* Subtle fill glow */}
        <circle cx={W / 2} cy={H / 2} r={RADIUS * 0.92} fill="url(#sphereGlow)" />
 
        {ringAngles.map((angle, ri) => {
          const ellipseRx = RADIUS * 1.04;
          const ellipseRy = RADIUS * 0.3;
          const rotDeg = (angle * 180) / Math.PI + (ry * 180) / Math.PI * 0.25;
          const opacity = isDark ? 0.10 + ri * 0.04 : 0.22 + ri * 0.07;
          return (
            <ellipse
              key={ri}
              cx={W / 2} cy={H / 2}
              rx={ellipseRx} ry={ellipseRy}
              fill="none"
              stroke={`rgba(${accentRgbStr}, ${opacity})`}
              strokeWidth={isDark ? 0.8 : 1.2}
              transform={`rotate(${rotDeg}, ${W / 2}, ${H / 2})`}
            />
          );
        })}
      </svg>
 
      {/* ── Skill nodes ── */}
      {projected.map(({ sx, sy, depth, scale, skill, i }) => {
        const isHov = hovered === i;
        const s = tierStyle(skill.tier, depth, isHov, isDark);
        return (
          <div
            key={skill.label}
            style={{
              position: "absolute",
              left: sx,
              top: sy,
              transform: "translate(-50%, -50%)",
              zIndex: Math.round(depth * 100),
              pointerEvents: depth > 0.12 ? "auto" : "none",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: s.fontSize * scale * 1.1,
                fontWeight: s.fontWeight,
                color: s.color,
                opacity: s.opacity,
                background: s.bg,
                border: s.border,
                boxShadow: s.shadow,
                filter: s.filter || undefined,
                borderRadius: 999,
                padding: `${3 * scale}px ${8 * scale}px`,
                whiteSpace: "nowrap",
                letterSpacing: skill.tier === 0 ? "-0.01em" : "0",
                transition: "opacity 0.18s ease, box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.18s ease",
                transform: isHov ? "scale(1.18)" : "scale(1)",
                cursor: "default",
                userSelect: "none",
                backdropFilter: isHov ? "blur(4px)" : "none",
              }}
            >
              {skill.label}
            </span>
          </div>
        );
      })}
 
      {/* ── Center dot ── */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: 7, height: 7,
        borderRadius: "50%",
        background: isDark ? "#5eead4" : "#0d9488",
        boxShadow: `0 0 14px ${isDark ? "rgba(94,234,212,0.7)" : "rgba(13,148,136,0.6)"}`,
        pointerEvents: "none",
      }} />
 
      {/* ── Drag hint ── */}
      <p style={{
        position: "absolute",
        bottom: -28,
        width: "100%",
        textAlign: "center",
        fontSize: 10,
        color: isDark ? "rgba(94,234,212,0.3)" : "rgba(13,148,136,0.35)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        pointerEvents: "none",
        fontFamily: "var(--font-geist-mono, monospace)",
      }}>
        drag to explore
      </p>
    </div>
  );
}