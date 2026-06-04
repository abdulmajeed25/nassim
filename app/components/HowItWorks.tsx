const steps = [
  {
    n: 1,
    title: "اطلب الخدمة",
    desc: "تواصل معنا مباشرة عبر الواتساب لتحديد الموعد المناسب.",
  },
  {
    n: 2,
    title: "نؤكد الموعد",
    desc: "سيتصل بك فريقنا لتأكيد تفاصيل الموعد والخدمة.",
  },
  {
    n: 3,
    title: "نصل إليك",
    desc: "يصلك الفني في الموعد المحدد لتقديم الخدمة باحترافية.",
  },
];

export default function HowItWorks() {
  return (
    <section id="booking" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            طلب الخدمة في 3 خطوات بسيطة
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            لأننا نقدر وقتك، صممنا عملية حجز سريعة ومباشرة تضمن لك الراحة.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-cyan-700 text-white flex items-center justify-center text-2xl font-bold mb-5">
                ✓
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                {s.n}. {s.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-cyan-700 to-cyan-900 text-white rounded-3xl p-10 md:p-14 text-center shadow-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
            جاهز للبدء؟
          </h3>
          <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
            فريقنا متواجد الآن لخدمتك. لا تتردد في التواصل معنا لحجز موعدك أو
            الاستفسار عن خدماتنا.
          </p>
          <a
            href="https://wa.me/966541701841"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-cyan-700 font-bold text-lg py-4 px-10 rounded-full shadow-xl hover:bg-slate-100 transform hover:scale-105 transition-all duration-300"
          >
            اطلب عبر واتساب
          </a>
          <p className="mt-4 text-sm text-cyan-200">رد فوري • خدمة 24/7</p>
        </div>
      </div>
    </section>
  );
}
