const steps = [
  {
    n: 1,
    title: "اطلب الخدمة",
    desc: "تواصل معنا مباشرة عبر الواتساب لتحديد الموعد المناسب.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    n: 2,
    title: "نؤكد الموعد",
    desc: "سيتصل بك فريقنا لتأكيد تفاصيل الموعد والخدمة.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    n: 3,
    title: "نصل إليك",
    desc: "يصلك الفني في الموعد المحدد لتقديم الخدمة باحترافية.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17h2"
        />
      </svg>
    ),
  },
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.287.468-1.028 3.746 3.824-1.003.478.282z" />
  </svg>
);

export default function HowItWorks() {
  return (
    <section
      id="booking"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[80%] h-[80%] bg-white/40 rounded-full blur-3xl z-0" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
              طلب الخدمة في{" "}
              <span className="text-cyan-600">3 خطوات</span> بسيطة
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              لأننا نقدر وقتك، صممنا عملية حجز سريعة ومباشرة تضمن لك الراحة.
            </p>
          </div>
          <div className="flex flex-col gap-16">
            <div className="grid md:grid-cols-3 gap-8 relative items-start">
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 -z-10 border-t border-dashed border-cyan-300"
              />
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex flex-col items-center text-center group relative z-10 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-cyan-50 text-cyan-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {s.n}. {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full max-w-4xl mx-auto mt-4">
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-50 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-center md:text-right flex-1">
                    <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center md:justify-start gap-3">
                      <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <WhatsAppIcon className="w-6 h-6" />
                      </span>
                      جاهز للبدء؟
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      فريقنا متواجد الآن لخدمتك. لا تتردد في التواصل معنا لحجز
                      موعدك أو الاستفسار عن خدماتنا.
                    </p>
                  </div>
                  <div className="w-full md:w-auto min-w-[300px]">
                    <div className="relative group/btn">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full blur opacity-40 group-hover/btn:opacity-75 transition duration-500" />
                      <a
                        href="https://wa.me/966541701841"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xl font-bold py-5 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full"
                      >
                        <WhatsAppIcon className="w-7 h-7 animate-pulse" />
                        <span>اطلب عبر واتساب</span>
                      </a>
                    </div>
                    <div className="mt-4 text-center text-sm text-slate-400">
                      رد فوري • خدمة 24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
