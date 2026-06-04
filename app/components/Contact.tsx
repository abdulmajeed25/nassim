const PHONE_DIGITS = "966541701841";
const PHONE_DISPLAY = "+966541701841";
const PHONE_DISPLAY_WA = "966541701841";

const methods = [
  {
    title: "واتساب",
    info: PHONE_DISPLAY_WA,
    href: `https://wa.me/${PHONE_DIGITS}`,
    action: "أرسل رسالة",
    icon: "💬",
  },
  {
    title: "الجوال",
    info: PHONE_DISPLAY,
    href: `tel:+${PHONE_DIGITS}`,
    action: "اتصل الآن",
    icon: "📞",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            تواصل معنا مباشرة
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            نحن هنا لمساعدتك. اختر الطريقة الأنسب لك للتواصل معنا.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {methods.map((m) => (
            <a
              key={m.title}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-700 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-cyan-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{m.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{m.title}</h3>
              <p
                className="text-xl font-light text-slate-300 group-hover:text-white mb-4"
                dir="ltr"
              >
                {m.info}
              </p>
              <span className="mt-auto bg-slate-600 group-hover:bg-white group-hover:text-cyan-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300">
                {m.action}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
