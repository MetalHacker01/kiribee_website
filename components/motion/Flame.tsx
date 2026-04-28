"use client";

export function Flame({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 96"
      aria-hidden="true"
      className={`origin-bottom animate-flame-flicker ${className}`}
    >
      <defs>
        <radialGradient id="flameGradient" cx="50%" cy="65%" r="55%">
          <stop offset="0%" stopColor="#FFF6D6" stopOpacity="1" />
          <stop offset="35%" stopColor="#FFD66B" stopOpacity="0.95" />
          <stop offset="80%" stopColor="#E8B53A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C8821C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="flameCore" cx="50%" cy="70%" r="35%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFE19B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M32 8c8 12 16 20 16 36 0 12-7.16 22-16 22S16 56 16 44c0-16 8-24 16-36z"
        fill="url(#flameGradient)"
      />
      <ellipse cx="32" cy="56" rx="6" ry="11" fill="url(#flameCore)" />
    </svg>
  );
}
