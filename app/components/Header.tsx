export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <div className="flex items-center">
          <a
            href="#hero"
            className="hover:opacity-90 transition-opacity duration-300 block"
          >
            <div
              className="flex items-center gap-2.5"
              style={{ fontFamily: "var(--font-tajawal), sans-serif" }}
            >
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
          <a
            href="#services"
            className="hover:text-cyan-500 transition-colors duration-300"
          >
            خدماتنا
          </a>
          <a
            href="#booking"
            className="hover:text-cyan-500 transition-colors duration-300"
          >
            احجز الآن
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-500 transition-colors duration-300"
          >
            تواصل معنا
          </a>
        </nav>
        <div className="md:hidden">
          <button
            type="button"
            aria-label="القائمة"
            className="text-slate-700 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
