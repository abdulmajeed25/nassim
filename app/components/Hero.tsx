import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-slate-900 min-h-[85vh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </div>
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-right space-y-8">
            <div className="inline-flex items-center gap-2 bg-cyan-900/50 border border-cyan-700/50 rounded-full px-4 py-1.5 text-cyan-300 text-sm font-medium backdrop-blur-sm animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              خدمة متاحة الآن في القصيم
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.15] tracking-tight">
              برودة تدوم..
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                وصيانة تثق بها.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-light">
              نقدم لك تجربة للتبريد والتكييف بمواصفات عالمية. عمالة مختصة، قطع
              غيار أصلية، وضمان حقيقي يمنحك راحة البال التامة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#booking"
                className="group bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-full shadow-[0_10px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>اطلب الخدمة الآن</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:translate-y-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <a
                href="#services"
                className="bg-slate-800/50 hover:bg-slate-800 text-white font-bold text-lg py-4 px-10 rounded-full border border-slate-700 hover:border-slate-500 backdrop-blur-sm transition-all duration-300 text-center"
              >
                استكشف خدماتنا
              </a>
            </div>
            <div className="pt-8 flex items-center gap-6 border-t border-slate-800/50 mt-8">
              <div>
                <div className="flex -space-x-3 rtl:space-x-reverse mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-slate-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="text-yellow-500 text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-slate-400 text-sm leading-tight">
                <strong className="text-white block text-lg font-bold">
                  +500 عميل
                </strong>
                وثقوا بنا هذا الشهر
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-[100px] opacity-20 animate-pulse" />
            <div className="relative rounded-[3rem] overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800/50 backdrop-blur-xl p-4 rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="relative w-full h-[500px] rounded-[2.5rem] overflow-hidden">
                <Image
                  src="/technician_main.webp"
                  alt="فني تكييف من تقنية النسيم"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-12 right-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow max-w-xs">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    ضمان الجودة 100%
                  </p>
                  <p className="text-xs text-slate-500">فحص شامل ودقيق</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
