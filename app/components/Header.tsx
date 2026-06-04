export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a
          href="#hero"
          className="flex flex-col items-end leading-none select-none"
        >
          <span className="text-cyan-700 font-extrabold text-2xl">
            تقنية النسيم
          </span>
          <span className="text-cyan-600 font-bold tracking-widest text-[10px] mt-0.5">
            TAQNIA AL-NASEEM
          </span>
          <span className="text-slate-500 text-xs mt-0.5">
            للتبـريـد والتكيـيـف
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-slate-700 font-bold">
          <a href="#services" className="hover:text-cyan-700 transition-colors">
            خدماتنا
          </a>
          <a href="#booking" className="hover:text-cyan-700 transition-colors">
            احجز الآن
          </a>
          <a href="#contact" className="hover:text-cyan-700 transition-colors">
            تواصل معنا
          </a>
        </nav>
      </div>
    </header>
  );
}
