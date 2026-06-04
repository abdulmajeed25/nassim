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
    <section id="services" className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 opacity-50 -z-10" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-cyan-600 font-bold uppercase tracking-wider text-sm bg-cyan-50 px-4 py-1 rounded-full mb-4 inline-block">
              خدماتنا
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              حلول متكاملة
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                لانتعاش منزلك
              </span>
            </h2>
          </div>
          <p className="text-lg text-slate-600 max-w-md pb-2">
            نقدم لك باقة شاملة من الخدمات المصممة خصيصاً للحفاظ على أداء مكيفك
            بأعلى كفاءة وأطول عمر افتراضي.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(8,145,178,0.15)] hover:border-cyan-100 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-cyan-500 flex items-center justify-center text-3xl mb-8 transition-colors duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-cyan-200">
                <span className="grayscale group-hover:grayscale-0 transition-all duration-500">
                  {s.icon}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-cyan-700 transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 flex-grow">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
