import type { ReactNode } from "react";

export type IconName =
  | "moon"
  | "heart"
  | "music"
  | "letter"
  | "pin"
  | "game"
  | "belt"
  | "bear"
  | "cake"
  | "lock";

const iconPaths: Record<IconName, ReactNode> = {
  moon: <path d="M20.8 15.1A8.8 8.8 0 0 1 8.9 3.2 9 9 0 1 0 20.8 15Z" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  music: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </>
  ),
  letter: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  game: (
    <>
      <path d="M8 8h8a5 5 0 0 1 4.8 3.7l1 3.9a3 3 0 0 1-5.2 2.7L15 16H9l-1.6 2.3a3 3 0 0 1-5.2-2.7l1-3.9A5 5 0 0 1 8 8Z" />
      <path d="M7 11v4M5 13h4M17 12h.01M19 14h.01" />
    </>
  ),
  belt: (
    <>
      <path d="M3 8h18v8H3zM8 8v8M16 8v8" />
      <path d="m12 8 2-3M12 8l-2-3" />
    </>
  ),
  bear: (
    <>
      <circle cx="7" cy="7" r="3" />
      <circle cx="17" cy="7" r="3" />
      <circle cx="12" cy="12" r="8" />
      <circle cx="9.5" cy="11" r=".5" fill="currentColor" />
      <circle cx="14.5" cy="11" r=".5" fill="currentColor" />
      <path d="M10 14c1 1 3 1 4 0" />
    </>
  ),
  cake: (
    <>
      <path d="M5 10h14v10H5zM4 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" />
      <path d="M9 7V4m6 3V4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
};

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
