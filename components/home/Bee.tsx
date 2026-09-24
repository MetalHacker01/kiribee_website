import s from "./home.module.css";

// A small bee facing right, defined once as a <symbol> (BeeSprite) and
// reused everywhere through <use>, so the markup ships only once. Each wing
// sits in a <g> so the SVG rotate attribute and the CSS flap never fight.
export function BeeShape() {
  return (
    <g>
      <g transform="rotate(-18 -1.5 -4)">
        <ellipse className={s.wing} cx="-1.5" cy="-7" rx="4.3" ry="6.2" />
      </g>
      <g transform="rotate(16 2.5 -4)">
        <ellipse className={`${s.wing} ${s.wingBack}`} cx="2.5" cy="-7" rx="3.6" ry="5.4" />
      </g>
      <path d="M-7.3 0.6 L-10.4 1.4 L-7.3 2.4 Z" fill="#2a1b0e" />
      <ellipse cx="0" cy="1" rx="7.6" ry="5.3" fill="#f2b53a" />
      <path
        d="M-3.2 -3.6 Q-2.3 1 -3.2 5.6 M1 -4.2 Q1.9 1 1 6.2"
        stroke="#2a1b0e"
        strokeWidth="1.9"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="-1" cy="-1.6" rx="3.6" ry="1.3" fill="#fff4cf" opacity="0.55" />
      <circle cx="7.7" cy="0.2" r="3.3" fill="#2a1b0e" />
      <circle cx="8.8" cy="-0.8" r="0.75" fill="#fff" opacity="0.8" />
      <path
        d="M8.8 -2.6 Q10 -6 12.4 -6.6 M7.4 -2.9 Q7.8 -6.8 9.8 -8"
        stroke="#2a1b0e"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

export const BEE_ID = "kb-bee";

export function BeeSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id={BEE_ID} viewBox="-13 -14 27 24" overflow="visible">
          <BeeShape />
        </symbol>
      </defs>
    </svg>
  );
}

export function Bee({ className }: { className?: string }) {
  return (
    <svg viewBox="-13 -14 27 24" className={className} aria-hidden="true" focusable="false">
      <use href={`#${BEE_ID}`} x="-13" y="-14" width="27" height="24" />
    </svg>
  );
}
