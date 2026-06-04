import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 text-white overflow-hidden"
    >
      <picture className="absolute inset-0 opacity-15 pointer-events-none">
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero.avif"
          type="image/avif"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero.webp"
          type="image/webp"
        />
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          alt=""
          aria-hidden="true"
          width={960}
          height={641}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-700/40 to-cyan-900/70" />
      <div className="relative container mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-right">
          <span className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm font-medium mb-6">
            خدمة متاحة الآن في القصيم
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-6">
            برودة تدوم..
            <br />
            وصيانة تثق بها.
          </h1>
          <p className="text-lg md:text-xl font-light text-cyan-100 mb-8 max-w-2xl">
            نقدم لك تجربة للتبريد والتكييف بمواصفات عالمية. عمالة مختصة، قطع
            غيار أصلية، وضمان حقيقي يمنحك راحة البال التامة.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#booking"
              className="bg-white text-cyan-700 font-bold text-lg py-3.5 px-8 rounded-full shadow-xl hover:bg-slate-100 transform hover:scale-105 transition-all duration-300"
            >
              اطلب الخدمة الآن
            </a>
            <a
              href="#services"
              className="border-2 border-white text-white font-bold text-lg py-3.5 px-8 rounded-full hover:bg-white hover:text-cyan-700 transition-all duration-300"
            >
              استكشف خدماتنا
            </a>
          </div>
          <div className="flex items-center gap-4 mt-10 justify-center md:justify-start">
            <div className="flex text-amber-300 text-2xl">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div>
              <div className="font-bold text-lg">+500 عميل</div>
              <div className="text-sm text-cyan-100">وثقوا بنا هذا الشهر</div>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
            <Image
              src="/technician_main.webp"
              alt="فني تكييف من تقنية النسيم"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQH/8QAJRAAAgIBAgQHAAAAAAAAAAAAAQIDEQUABBIxQWEGEyEicYGh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAZEQACAwEAAAAAAAAAAAAAAAAAAQISIQP/2gAMAwEAAhEDEQA/AIYcvtIM6suz86dkdmjUiuINfeut/WkWIybZHIszTmRQpNVQHqKrtz1mb7hXhCsPal8IrlelPg6VNxHOqMYtzBwmN7slT0+LH7qs+NFgVOz0/9k="
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white text-slate-800 rounded-2xl p-4 shadow-xl flex items-center gap-3">
            <div className="bg-emerald-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
              ✓
            </div>
            <div>
              <div className="font-bold text-sm">ضمان الجودة 100%</div>
              <div className="text-xs text-slate-500">فحص شامل ودقيق</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
