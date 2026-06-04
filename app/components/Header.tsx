"use client";

import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "#services", label: "خدماتنا" },
  { href: "#booking", label: "احجز الآن" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        panelRef.current?.contains(t) ||
        buttonRef.current?.contains(t)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <div className="flex items-center">
          <a
            href="#hero"
            className="hover:opacity-90 transition-opacity duration-300 block"
          >
            <div
              className="flex items-center gap-3"
              style={{ fontFamily: "var(--font-tajawal), sans-serif" }}
            >
              <img src="/logo.svg" alt="تقنية النسيم للوجو" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-md transition-transform hover:scale-105 duration-300" />
              <div className="flex flex-col text-right leading-none gap-1">
                <span className="text-[#0f4c81] text-base md:text-lg font-black tracking-wide drop-shadow-sm">
                  تقنية النسيم
                </span>
                <span className="text-[#0e7490] text-[10px] md:text-[11px] font-black tracking-[0.15em] uppercase">
                  Taqnia Al-Naseem
                </span>
                <span className="text-[#0f4c81] text-[9px] md:text-[10px] font-extrabold tracking-widest bg-[#f4f9fc] px-2 py-0.5 rounded-full border border-blue-100/50 self-start mt-0.5">
                  للتبـريـد والتكيـيـف
                </span>
              </div>
            </div>
          </a>
        </div>
        <nav className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-lg font-medium text-slate-700">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="hover:text-cyan-500 transition-colors duration-300"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={panelRef}
        id="mobile-nav"
        className={`md:hidden overflow-hidden bg-slate-900 text-white transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="container mx-auto px-6 py-4 flex flex-col gap-2 text-lg font-medium"
          aria-hidden={!open}
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-3 rounded-lg hover:bg-slate-800 hover:text-cyan-500 transition-colors duration-200"
              tabIndex={open ? 0 : -1}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
