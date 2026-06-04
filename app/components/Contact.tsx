const PHONE_DIGITS = "966541701841";
const PHONE_DISPLAY = "+966541701841";
const PHONE_DISPLAY_WA = "966541701841";

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.287.468-1.028 3.746 3.824-1.003.478.282z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const methods = [
  {
    title: "واتساب",
    info: PHONE_DISPLAY_WA,
    href: `https://wa.me/${PHONE_DIGITS}`,
    action: "أرسل رسالة",
    Icon: WhatsAppIcon,
  },
  {
    title: "الجوال",
    info: PHONE_DISPLAY,
    href: `tel:+${PHONE_DIGITS}`,
    action: "اتصل الآن",
    Icon: PhoneIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-slate-800 text-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            تواصل معنا مباشرة
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            نحن هنا لمساعدتك. اختر الطريقة الأنسب لك للتواصل معنا.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {methods.map((m) => (
            <a
              key={m.title}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 p-8 rounded-xl flex flex-col items-center text-center group hover:bg-cyan-600 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-cyan-400 group-hover:text-white transition-colors duration-300 mb-4">
                <m.Icon />
              </div>
              <h3 className="text-2xl font-bold mb-2">{m.title}</h3>
              <p
                className="text-xl font-light text-slate-300 group-hover:text-white mb-4"
                dir="ltr"
              >
                {m.info}
              </p>
              <span className="mt-auto bg-slate-600 group-hover:bg-white group-hover:text-cyan-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300">
                {m.action}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
