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
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-700 font-bold text-sm tracking-widest uppercase">
            لماذا نحن؟
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 mb-4">
            معايير عالمية في خدمتك
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            نحن لا نقوم بالإصلاح فقط، بل نضمن لك راحة البال والجودة التي
            تستحقها.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
