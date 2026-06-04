const services = [
  {
    icon: "🔧",
    title: "صيانة دورية وشاملة",
    desc: "فحص كامل لجميع أجزاء المكيف لضمان أفضل أداء وتجنب الأعطال المفاجئة.",
  },
  {
    icon: "🧹",
    title: "تنظيف عميق للوحدات",
    desc: "تنظيف الفلاتر والمكونات الداخلية والخارجية لتحسين جودة الهواء وكفاءة التبريد.",
  },
  {
    icon: "❄️",
    title: "تعبئة غاز الفريون",
    desc: "قياس وإعادة تعبئة غاز الفريون للوصول إلى مستوى التبريد المثالي.",
  },
  {
    icon: "🛠️",
    title: "إصلاح جميع الأعطال",
    desc: "تشخيص دقيق وإصلاح احترافي لجميع المشاكل والأعطال في نظام التكييف.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-cyan-700 font-bold text-sm tracking-widest uppercase">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-2 mb-4 leading-tight">
            حلول متكاملة
            <br />
            لانتعاش منزلك
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            نقدم لك باقة شاملة من الخدمات المصممة خصيصاً للحفاظ على أداء مكيفك
            بأعلى كفاءة وأطول عمر افتراضي.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">
                {s.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
