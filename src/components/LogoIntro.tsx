import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.jpg.asset.json";

/*
 * Opening: the logo on its own gold, with white feathers drifting down past it (the store sells
 * pillows and bedding). Every feather's position and timing is fixed here, not random, so the
 * server-rendered markup matches the browser's first render. Negative delays start each feather
 * part-way through its fall, so the screen is already full of feathers on the first frame.
 */
// back: behind the logo, smaller and softer. front: a few larger ones passing in front of it.
const FEATHERS = [
  { left: 4, size: 74, dur: 8.2, delay: -1.2, sway: 5.6, tilt: -24, opacity: 0.9, front: false },
  { left: 14, size: 56, dur: 9.4, delay: -5.1, sway: 4.4, tilt: 18, opacity: 0.65, front: false },
  { left: 24, size: 86, dur: 7.8, delay: -3.4, sway: 6.2, tilt: -8, opacity: 0.85, front: false },
  { left: 33, size: 52, dur: 9.8, delay: -0.4, sway: 3.8, tilt: 32, opacity: 0.55, front: false },
  { left: 43, size: 70, dur: 8.6, delay: -6.3, sway: 5.0, tilt: -30, opacity: 0.8, front: false },
  { left: 52, size: 60, dur: 9.0, delay: -2.2, sway: 4.6, tilt: 12, opacity: 0.7, front: false },
  { left: 61, size: 82, dur: 8.0, delay: -4.6, sway: 6.6, tilt: -16, opacity: 0.9, front: false },
  { left: 70, size: 54, dur: 10.2, delay: -7.0, sway: 4.0, tilt: 26, opacity: 0.55, front: false },
  { left: 79, size: 76, dur: 8.4, delay: -0.9, sway: 5.4, tilt: -20, opacity: 0.85, front: false },
  { left: 88, size: 58, dur: 9.6, delay: -3.9, sway: 4.2, tilt: 14, opacity: 0.65, front: false },
  { left: 96, size: 80, dur: 8.0, delay: -5.8, sway: 6.0, tilt: -28, opacity: 0.8, front: false },
  { left: 9, size: 64, dur: 9.2, delay: -7.8, sway: 4.8, tilt: 22, opacity: 0.75, front: false },
  { left: 38, size: 78, dur: 7.9, delay: -8.4, sway: 5.8, tilt: -12, opacity: 0.85, front: false },
  { left: 66, size: 50, dur: 10.4, delay: -9.1, sway: 3.6, tilt: 30, opacity: 0.5, front: false },
  { left: 18, size: 108, dur: 6.6, delay: -2.6, sway: 6.8, tilt: 16, opacity: 1, front: true },
  { left: 57, size: 96, dur: 7.0, delay: -5.4, sway: 6.4, tilt: -22, opacity: 1, front: true },
  { left: 84, size: 112, dur: 6.4, delay: -1.0, sway: 7.0, tilt: 10, opacity: 1, front: true },
  { left: 36, size: 92, dur: 7.2, delay: -0.2, sway: 6.0, tilt: -6, opacity: 0.95, front: true },
];

function Feather({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 40 100"
      width={size * 0.4}
      height={size}
      aria-hidden
      style={{ opacity }}
      className="block drop-shadow-[0_6px_8px_rgba(80,52,10,0.28)]"
    >
      {/* vane: wider on one side, with two splits cut into the edges like a real feather */}
      <path
        d="M22 4C30 14 35 26 34 40L27 43 33.5 47C33 58 29 70 21.5 84L20.5 98 19.5 84C11 76 6 64 6 50L13 47 6.3 43.5C6.8 27 13 13 22 4Z"
        fill="#ffffff"
      />
      {/* barbs: faint lines running out from the shaft */}
      <g stroke="var(--logo-gold)" strokeOpacity="0.28" strokeWidth="0.7" strokeLinecap="round">
        <path d="M21.2 20 13 14" />
        <path d="M21.4 32 9.5 26" />
        <path d="M21.4 56 9 49" />
        <path d="M21 70 11.5 65" />
        <path d="M21.6 26 30 19" />
        <path d="M21.6 40 32 33" />
        <path d="M21.4 62 30.5 55" />
      </g>
      {/* shaft */}
      <path
        d="M21.6 8C22.2 34 22 64 20.5 98"
        fill="none"
        stroke="var(--logo-gold)"
        strokeOpacity="0.6"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoIntro() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("alrabhi-intro-seen")) {
      setGone(true);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("alrabhi-intro-seen", "1");
      setGone(true);
    }, 3400);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-curtain-out fixed inset-0 z-50 overflow-hidden bg-[var(--logo-gold)]">
      {/* feathers behind the logo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {FEATHERS.filter((f) => !f.front).map((f, i) => (
          <FeatherFall key={i} {...f} />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative">
          <span className="intro-halo absolute inset-0 rounded-full bg-white/25 blur-2xl" />
          <img
            src={logoAsset.url}
            alt="الرابحي للمفروشات"
            width={288}
            height={288}
            className="intro-seal relative h-72 w-72 rounded-full object-cover sm:h-96 sm:w-96"
          />
        </div>
        {/* the logo already carries the name, so the heading is for screen readers */}
        <h1 className="sr-only">الرابحي للمفروشات</h1>
      </div>

      {/* and a few in front, so the logo sits among them rather than under a layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {FEATHERS.filter((f) => f.front).map((f, i) => (
          <FeatherFall key={i} {...f} />
        ))}
      </div>
    </div>
  );
}

function FeatherFall(f: (typeof FEATHERS)[number]) {
  return (
    <div
      className="feather-fall absolute -top-[14vh]"
      style={{
        left: `${f.left}%`,
        animationDuration: `${f.dur}s`,
        animationDelay: `${f.delay}s`,
      }}
    >
      <div
        className="feather-sway"
        style={
          {
            animationDuration: `${f.sway / 2}s`,
            animationDelay: `${(f.delay / 3).toFixed(2)}s`,
            "--tilt": `${f.tilt}deg`,
          } as React.CSSProperties
        }
      >
        <Feather size={f.size} opacity={f.opacity} />
      </div>
    </div>
  );
}
