const features = [
  {
    icon: "🛡️",
    title: "ضمان ذهبي",
    desc: "نقدم ضماناً شاملاً على جميع قطع الغيار والخدمات المقدمة لمدة تصل إلى 30 يوماً.",
  },
  {
    icon: "👨‍🔧",
    title: "عمالة مختصة",
    desc: "طاقم عمل متخصص ومدرب للتعامل مع كافة أنواع المكيفات.",
  },
  {
    icon: "⚡",
    title: "سرعة الاستجابة",
    desc: "نقدر وقتك، ولذلك نلتزم بالوصول إليك في الموعد المحدد دون أي تأخير.",
  },
  {
    icon: "⚙️",
    title: "قطع غيار أصلية",
    desc: "نستخدم فقط قطع الغيار الأصلية لضمان عمر أطول للمكيف وكفاءة تبريد أعلى.",
  },
  {
    icon: "✨",
    title: "تعقيم وتنظيف",
    desc: "خدماتنا تشمل تعقيم الوحدات لضمان هواء صحي ونقي خالٍ من البكتيريا والغبار.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-cyan-600 font-bold uppercase tracking-wider text-sm bg-cyan-50 px-4 py-1 rounded-full mb-4 inline-block">
            لماذا نحن؟
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            معايير عالمية في{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              خدمتك
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            نحن لا نقوم بالإصلاح فقط، بل نضمن لك راحة البال والجودة التي
            تستحقها.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-right">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-cyan-200 group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-2xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {f.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
